# AI-Assistant Web 前端（可视化工程）

基于 **Vite + React + TypeScript + TailwindCSS** 的单页应用，用于以可视化方式浏览 AI-Assistant 项目的工作生命周期、工具目录、案例和 Prompt 库。

## 功能概览

- **Dashboard 首页**：展示整体统计、生命周期概览、最近案例和 Prompt 集锦概览。
- **生命周期视图**（`/lifecycle`）：按 8 个阶段展示工作全流程。
- **AI 工具目录**（`/tools`）：按平台/IDE/MCP/Skills/Agent 分类浏览工具卡片，可查看 MCP / Skills 的 Markdown 说明。
- **案例浏览**（`/cases` & `/cases/:caseId`）：按时间线浏览案例列表，点击进入 Markdown 详情页。
- **Prompt 集锦**（`/prompts` & `/prompts/:stage`）：按阶段浏览 Prompt 组，点击查看该阶段全部 Prompt Markdown 内容。

所有内容数据均在构建前由 `scripts/generate-data.ts` 解析项目根目录下的 Markdown 文件，生成 `src/data/*.json` 供前端静态导入。

---

## 本地开发

```bash
cd web
npm install
npm run dev
```

默认使用 **local 内容源**（扫描本地仓库中的 `catalog/`、`lifecycle/`、`cases/`、`prompts/`），每次运行 `npm run dev` 或 `npm run build` 前会执行：

```bash
npm run prebuild  # 即 node ./scripts/generate-data.ts
```

生成的数据文件：

- `src/data/lifecycle.json`
- `src/data/tools.json`
- `src/data/cases.json`
- `src/data/prompts.json`

前端组件只依赖这些 JSON，**不直接访问 Markdown 文件**。

---

## 内容源配置（local / github / gitlab）

前端支持三种内容源模式，通过环境变量控制：

- `CONTENT_PROVIDER` 或 `VITE_CONTENT_PROVIDER`：
  - `local`（默认）：从当前项目文件系统读取 Markdown。
  - `github`：从 GitHub 仓库读取 Markdown。
  - `gitlab`：从 GitLab 仓库读取 Markdown。

### 1. local 模式（默认）

无需额外配置，`generate-data.ts` 会：

- 扫描项目根目录下的：
  - `lifecycle/`
  - `catalog/`（含 `platforms/`、`ide-plugins/`、`mcp-services/`、`skills/`、`agents/`）
  - `cases/`
  - `prompts/`
- 使用 `gray-matter` 解析 Frontmatter + 正文，生成 JSON。

适用场景：

- 本地开发。
- CI / 构建机先 `git clone` 仓库，然后 `npm run build`，生成 `dist` 再部署到任何静态站点托管服务。

### 2. GitHub 模式

设置环境变量（本地或 CI）：

```bash
export CONTENT_PROVIDER=github
export GITHUB_OWNER=your-github-user-or-org
export GITHUB_REPO=your-repo-name
export GITHUB_BRANCH=main              # 可选，默认 main
export GITHUB_TOKEN=ghp_xxx            # 推荐在 CI 中配置机密
```

行为说明：

- `generate-data.ts` 会通过 GitHub API 读取远程仓库中以下目录的 `.md` 文件：
  - `lifecycle/`
  - `catalog/**`
  - `cases/**`
  - `prompts/**`
- 拉取内容后，同样生成 `src/data/*.json`，前端逻辑无需修改。

适用场景：

- 构建机不直接挂载代码，只通过 GitHub API 拉取文档。
- 可从**单独的文档仓库**为本前端提供内容。

### 3. GitLab 模式

设置环境变量：

```bash
export CONTENT_PROVIDER=gitlab
export GITLAB_BASE_URL=https://gitlab.com              # 或你的自建 GitLab 地址
export GITLAB_PROJECT_ID=123456                        # GitLab 项目 ID
export GITLAB_BRANCH=master                            # 可选，默认 master
export GITLAB_TOKEN=glpat_xxx                          # 推荐在 CI 中配置机密
```

行为说明：

- `generate-data.ts` 使用 GitLab API：
  - `GET /projects/:id/repository/tree` 获取包含 `.md` 的文件列表。
  - `GET /projects/:id/repository/files/:file_path/raw` 拉取原始 Markdown 内容。
- 同样生成 `src/data/*.json`，前端保持不变。

> 注意：本地环境的 sandbox 无法联网，但在你的 CI 或服务器环境中，只要网络可用，上述逻辑即可正常工作。

---

## 构建与部署

构建命令：

```bash
cd web
npm run build
```

将执行：

1. `prebuild`：运行 `node ./scripts/generate-data.ts` 生成最新 JSON 数据；
2. `build`：`tsc -b && vite build` 产出静态资源到 `dist/`。

构建产物：

- `dist/index.html`
- `dist/assets/*`（JS/CSS 等）

可以部署到任意支持静态资源的环境，例如：

- Nginx / Apache
- Vercel / Netlify / GitHub Pages / Cloudflare Pages
- 对象存储 + CDN（OSS / COS / S3 等）

---

### 部署到子路径（例如 Nginx `/ai-assistant`）

如果前端不是部署在域名根路径 `/`，而是挂在 Nginx 的某个子路径（如 `/ai-assistant`），需要两处配置：

1. **Vite 的 base 配置**（已在项目中设置好）

   `web/vite.config.ts` 中：

   ```ts
   export default defineConfig({
     plugins: [react()],
     base: '/ai-assistant/',
   })
   ```

2. **React Router 的 basename 配置**（已在项目中设置好）

   `web/src/App.tsx` 中：

   ```ts
   const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

   <BrowserRouter basename={basename}>
     {/* routes ... */}
   </BrowserRouter>
   ```

   这样无论本地开发还是生产部署，路由都会自动感知 Vite 的 `base` 前缀。

3. **Nginx 配置示例**

   假设将 `web/dist` 拷贝到服务器的 `/usr/share/nginx/html/ai-assistant/` 目录，Nginx 配置可以如下：

   ```nginx
   server {
       server_name your.domain.com;

       location /ai-assistant/ {
           root /usr/share/nginx/html;
           try_files $uri $uri/ /ai-assistant/index.html;
       }
   }
   ```

   要点：

   - `root` + `/ai-assistant/index.html` 能够定位到真实的 `index.html` 文件。
   - `try_files` 确保前端路由（如 `/ai-assistant/tools`、`/ai-assistant/cases/...`）都回退到同一个入口文件。

---

## 路由一览

- `/`：Dashboard
- `/lifecycle`：生命周期视图
- `/tools`：AI 工具目录
- `/tools/:toolId`：工具 Markdown 详情（MCP / Skills）
- `/cases`：案例列表
- `/cases/:caseId`：案例 Markdown 详情
- `/prompts`：Prompt 列表
- `/prompts/:stage`：某阶段 Prompt Markdown 详情

> 如果部署在子路径 `/ai-assistant`，实际访问路径形如：`/ai-assistant/tools`、`/ai-assistant/cases` 等。

---

## 开发建议

- 新增工具卡片时，在 `catalog/` 下补充对应 `.md` 文件，并在 `_index.md` 中维护索引。
- 新增案例时，可使用根目录的 `scripts/new-case.sh` 脚本快速创建模板，然后 `npm run build` 即可同步到前端。
- 如需扩展内容源（例如自定义 API 或其他文档系统），可在 `generate-data.ts` 中仿照 `loadMarkdownFilesGithub` / `loadMarkdownFilesGitlab` 新增 provider 实现。
