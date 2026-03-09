import type { FC } from 'react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import prompts from '../data/prompts.json'
import MarkdownViewer from '../components/MarkdownViewer'

const stageLabels: Record<string, string> = {
  design: '需求分析与方案设计',
  coding: '编码开发',
  review: '代码审查',
  test: '测试与质量保障',
  deploy: '部署与运维',
  doc: '文档与知识管理',
  debug: '问题排查与故障处理',
  learn: '学习与技能提升',
}

function stripLeadingHeading(markdown: string): string {
  const lines = markdown.split('\n')
  if (lines.length === 0) return markdown

  let firstIndex = 0
  while (firstIndex < lines.length && lines[firstIndex].trim().length === 0) {
    firstIndex += 1
  }
  if (firstIndex >= lines.length) return markdown

  const firstLine = lines[firstIndex].trim()
  if (!firstLine.startsWith('# ')) return markdown

  let nextIndex = firstIndex + 1
  while (nextIndex < lines.length && lines[nextIndex].trim().length === 0) {
    nextIndex += 1
  }

  return lines.slice(nextIndex).join('\n')
}

const PromptDetail: FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  const item = useMemo(() => {
    const stage = params.stage
    if (!stage) return undefined
    return prompts.find((p) => p.stage === stage)
  }, [params.stage])

  const handleBack = () => {
    navigate('/prompts')
  }

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-8 text-slate-50">
        <div className="mx-auto w-full max-w-3xl">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-500/70 hover:bg-slate-900"
          >
            返回 Prompt 集锦
          </button>
          <p className="text-sm text-slate-400">未找到对应阶段的 Prompt 详情。</p>
        </div>
      </div>
    )
  }

  const stageLabel = stageLabels[item.stage] ?? item.stage
  const markdownBody = stripLeadingHeading(item.markdown ?? '')

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center self-start rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-500/70 hover:bg-slate-900"
        >
          返回 Prompt 集锦
        </button>
        <div className="mb-3">
          <h1 className="text-lg font-semibold text-slate-50">{stageLabel}</h1>
          <p className="mt-1 text-xs text-slate-400">{item.title}</p>
        </div>
        <div className="h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <MarkdownViewer title={item.title} markdown={markdownBody} showHeader={false} />
        </div>
      </div>
    </div>
  )
}

export default PromptDetail

