import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'

type LifecycleItem = {
  stage: string
  title: string
  order: number
  description: string
  path: string
}

type ToolItem = {
  id: string
  title: string
  category: string
  stages?: string[]
  url?: string
  path: string
  markdown?: string
}

type CaseItem = {
  title: string
  date: string
  stage: string
  tools: string[]
  path: string
  markdown?: string
}

type PromptGroup = {
  stage: string
  title: string
  path: string
  markdown?: string
}

const PROJECT_ROOT = path.resolve(process.cwd(), '..')
const DATA_DIR = path.resolve(process.cwd(), 'src', 'data')

type ContentProvider = 'local' | 'github' | 'gitlab'

const providerEnv = (process.env.CONTENT_PROVIDER ?? process.env.VITE_CONTENT_PROVIDER ?? 'local') as ContentProvider
const CONTENT_PROVIDER: ContentProvider =
  providerEnv === 'github' || providerEnv === 'gitlab' ? providerEnv : 'local'

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true })
}

function extractDescription(content: string): string {
  const lines = content.split('\n')
  const idx = lines.findIndex((line) => line.trim().startsWith('## 阶段描述'))
  if (idx === -1) return ''

  const collected: string[] = []
  for (let i = idx + 1; i < lines.length; i += 1) {
    const line = lines[i]
    if (!line.trim()) {
      if (collected.length > 0) break
      // 跳过开头的空行
      // eslint-disable-next-line no-continue
      continue
    }
    if (line.trim().startsWith('## ')) break
    collected.push(line.trim())
  }
  return collected.join(' ')
}

type VirtualFile = {
  logicalPath: string
  content: string
}

async function loadMarkdownFilesLocal(baseDir: string): Promise<VirtualFile[]> {
  const rootDir = path.resolve(PROJECT_ROOT, baseDir)
  const results: VirtualFile[] = []

  async function walk(current: string) {
    const entries = await fs.readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        // eslint-disable-next-line no-await-in-loop
        await walk(entryPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // eslint-disable-next-line no-await-in-loop
        const raw = await fs.readFile(entryPath, 'utf8')
        const logicalPath = path.relative(PROJECT_ROOT, entryPath)
        results.push({ logicalPath, content: raw })
      }
    }
  }

  try {
    await walk(rootDir)
  } catch {
    // 目录可能不存在，返回空数组
  }

  return results
}

async function loadMarkdownFilesGithub(baseDir: string): Promise<VirtualFile[]> {
  const owner = process.env.GITHUB_OWNER ?? process.env.VITE_GITHUB_OWNER
  const repo = process.env.GITHUB_REPO ?? process.env.VITE_GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH ?? process.env.VITE_GITHUB_BRANCH ?? 'main'
  const token = process.env.GITHUB_TOKEN

  if (!owner || !repo) {
    throw new Error('GitHub provider requires GITHUB_OWNER/GITHUB_REPO (or VITE_GITHUB_OWNER/VITE_GITHUB_REPO)')
  }

  const apiBase = 'https://api.github.com'
  const results: VirtualFile[] = []

  async function walk(dir: string) {
    const url = `${apiBase}/repos/${owner}/${repo}/contents/${encodeURIComponent(dir)}?ref=${encodeURIComponent(
      branch,
    )}`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'User-Agent': 'ai-assistant-web',
      },
    })
    if (!res.ok) {
      throw new Error(`GitHub API error ${res.status} for ${url}`)
    }
    const data = (await res.json()) as Array<{
      type: 'file' | 'dir'
      name: string
      path: string
      download_url: string | null
    }>

    for (const entry of data) {
      if (entry.type === 'dir') {
        // eslint-disable-next-line no-await-in-loop
        await walk(entry.path)
      } else if (entry.type === 'file' && entry.name.endsWith('.md') && entry.download_url) {
        // eslint-disable-next-line no-await-in-loop
        const fileRes = await fetch(entry.download_url, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'ai-assistant-web',
              }
            : { 'User-Agent': 'ai-assistant-web' },
        })
        if (!fileRes.ok) {
          throw new Error(`GitHub raw error ${fileRes.status} for ${entry.download_url}`)
        }
        const content = await fileRes.text()
        results.push({ logicalPath: entry.path, content })
      }
    }
  }

  await walk(baseDir)
  return results
}

async function loadMarkdownFilesGitlab(baseDir: string): Promise<VirtualFile[]> {
  const projectId = process.env.GITLAB_PROJECT_ID ?? process.env.VITE_GITLAB_PROJECT_ID
  const branch = process.env.GITLAB_BRANCH ?? process.env.VITE_GITLAB_BRANCH ?? 'master'
  const baseUrl = process.env.GITLAB_BASE_URL ?? process.env.VITE_GITLAB_BASE_URL ?? 'https://gitlab.com'
  const token = process.env.GITLAB_TOKEN

  if (!projectId) {
    throw new Error('GitLab provider requires GITLAB_PROJECT_ID (or VITE_GITLAB_PROJECT_ID)')
  }

  const apiBase = `${baseUrl.replace(/\/$/, '')}/api/v4`
  const results: VirtualFile[] = []

  const treeUrl = `${apiBase}/projects/${encodeURIComponent(
    projectId,
  )}/repository/tree?path=${encodeURIComponent(baseDir)}&ref=${encodeURIComponent(branch)}&recursive=true&per_page=100`
  const res = await fetch(treeUrl, {
    headers: token
      ? {
          'PRIVATE-TOKEN': token,
        }
      : {},
  })
  if (!res.ok) {
    throw new Error(`GitLab API error ${res.status} for ${treeUrl}`)
  }
  const data = (await res.json()) as Array<{ type: 'blob' | 'tree'; path: string } & Record<string, unknown>>

  for (const entry of data) {
    if (entry.type === 'blob' && entry.path.endsWith('.md')) {
      const fileUrl = `${apiBase}/projects/${encodeURIComponent(
        projectId,
      )}/repository/files/${encodeURIComponent(entry.path)}/raw?ref=${encodeURIComponent(branch)}`
      // eslint-disable-next-line no-await-in-loop
      const fileRes = await fetch(fileUrl, {
        headers: token
          ? {
              'PRIVATE-TOKEN': token,
            }
          : {},
      })
      if (!fileRes.ok) {
        throw new Error(`GitLab raw error ${fileRes.status} for ${fileUrl}`)
      }
      const content = await fileRes.text()
      results.push({ logicalPath: entry.path, content })
    }
  }

  return results
}

async function loadMarkdownFiles(baseDir: string): Promise<VirtualFile[]> {
  if (CONTENT_PROVIDER === 'github') {
    return loadMarkdownFilesGithub(baseDir)
  }
  if (CONTENT_PROVIDER === 'gitlab') {
    return loadMarkdownFilesGitlab(baseDir)
  }
  return loadMarkdownFilesLocal(baseDir)
}

async function buildLifecycle(): Promise<LifecycleItem[]> {
  const files = await loadMarkdownFiles('lifecycle')
  const items: LifecycleItem[] = []

  for (const file of files) {
    const parsed = matter(file.content)
    const relative = file.logicalPath
    const name = path.basename(relative)

    const stage =
      typeof parsed.data.stage === 'string' ? parsed.data.stage : name.split('-')[1]?.replace('.md', '')
    const title = typeof parsed.data.title === 'string' ? parsed.data.title : name
    const order = typeof parsed.data.order === 'number' ? parsed.data.order : Number(name.split('-')[0]) || 0
    const description = extractDescription(parsed.content)

    items.push({ stage, title, order, description, path: relative })
  }

  return items.sort((a, b) => a.order - b.order)
}

async function buildTools(): Promise<ToolItem[]> {
  const categories = ['platforms', 'ide-plugins', 'mcp-services', 'skills', 'agents']
  const items: ToolItem[] = []

  for (const category of categories) {
    const files = await loadMarkdownFiles(`catalog/${category}`)

    for (const file of files) {
      const name = path.basename(file.logicalPath)
      if (!name.endsWith('.md')) continue
      if (name.startsWith('_')) continue

      const parsed = matter(file.content)

      const title = typeof parsed.data.title === 'string' ? parsed.data.title : name.replace('.md', '')
      const stages = Array.isArray(parsed.data.stages)
        ? parsed.data.stages.filter((s: unknown): s is string => typeof s === 'string')
        : undefined
      const url = typeof parsed.data.url === 'string' ? parsed.data.url : undefined
      const markdown =
        category === 'mcp-services' || category === 'skills'
          ? parsed.content.trim()
          : undefined

      items.push({
        id: `${category}/${name.replace('.md', '')}`,
        title,
        category,
        stages,
        url,
        path: file.logicalPath,
        markdown,
      })
    }
  }

  return items
}

async function walkCasesDir(baseDir: string): Promise<string[]> {
  const results: string[] = []
  const entries = await fs.readdir(baseDir, { withFileTypes: true })

  for (const entry of entries) {
    const entryPath = path.join(baseDir, entry.name)
    if (entry.isDirectory()) {
      const nested = await walkCasesDir(entryPath)
      results.push(...nested)
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      results.push(entryPath)
    }
  }

  return results
}

async function buildCases(): Promise<CaseItem[]> {
  const virtualFiles = await loadMarkdownFiles('cases')
  const items: CaseItem[] = []

  for (const file of virtualFiles) {
    const name = path.basename(file.logicalPath)
    if (name.startsWith('_')) continue
    const parsed = matter(file.content)

    const title = typeof parsed.data.title === 'string' ? parsed.data.title : name.replace('.md', '')
    const date = typeof parsed.data.date === 'string' ? parsed.data.date : ''
    const stage = typeof parsed.data.stage === 'string' ? parsed.data.stage : ''
    const tools = Array.isArray(parsed.data.tools)
      ? parsed.data.tools.filter((t: unknown): t is string => typeof t === 'string')
      : []
    const markdown = parsed.content.trim()

    items.push({ title, date, stage, tools, path: file.logicalPath, markdown })
  }

  return items.sort((a, b) => b.date.localeCompare(a.date))
}

async function buildPrompts(): Promise<PromptGroup[]> {
  const virtualFiles = await loadMarkdownFiles('prompts')
  const groups: PromptGroup[] = []

  for (const file of virtualFiles) {
    const name = path.basename(file.logicalPath)
    if (name !== '_index.md') continue
    const parsed = matter(file.content)
    const segments = file.logicalPath.split('/')
    const stage = segments.length >= 2 ? segments[segments.length - 2] : ''
    const title = typeof parsed.data.title === 'string' ? parsed.data.title : `${stage} Prompt`
    const markdown = parsed.content.trim()
    groups.push({ stage, title, path: file.logicalPath, markdown })
  }

  return groups
}

async function main() {
  await ensureDir(DATA_DIR)

  const [lifecycle, tools, cases, prompts] = await Promise.all([
    buildLifecycle(),
    buildTools(),
    buildCases(),
    buildPrompts(),
  ])

  await Promise.all([
    fs.writeFile(path.join(DATA_DIR, 'lifecycle.json'), JSON.stringify(lifecycle, null, 2), 'utf8'),
    fs.writeFile(path.join(DATA_DIR, 'tools.json'), JSON.stringify(tools, null, 2), 'utf8'),
    fs.writeFile(path.join(DATA_DIR, 'cases.json'), JSON.stringify(cases, null, 2), 'utf8'),
    fs.writeFile(path.join(DATA_DIR, 'prompts.json'), JSON.stringify(prompts, null, 2), 'utf8'),
  ])

  // eslint-disable-next-line no-console
  console.log(
    `[generate-data] generated lifecycle(${lifecycle.length}), tools(${tools.length}), cases(${cases.length}), prompts(${prompts.length})`,
  )
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('[generate-data] failed', error)
  process.exit(1)
})

