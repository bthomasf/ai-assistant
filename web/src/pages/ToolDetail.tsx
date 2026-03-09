import type { FC } from 'react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tools from '../data/tools.json'
import MarkdownViewer from '../components/MarkdownViewer'

const ToolDetail: FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  const tool = useMemo(() => {
    const rawId = params.toolId
    if (!rawId) return undefined
    const decoded = decodeURIComponent(rawId)
    return tools.find((item) => item.id === decoded)
  }, [params.toolId])

  const handleBack = () => {
    navigate('/tools')
  }

  if (!tool) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-8 text-slate-50">
        <div className="mx-auto w-full max-w-3xl">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-500/70 hover:bg-slate-900"
          >
            返回工具目录
          </button>
          <p className="text-sm text-slate-400">未找到对应的工具或该工具尚未配置详情。</p>
        </div>
      </div>
    )
  }

  const canShowMarkdown =
    (tool.category === 'mcp-services' || tool.category === 'skills') && typeof tool.markdown === 'string'

  if (!canShowMarkdown) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-8 text-slate-50">
        <div className="mx-auto w-full max-w-3xl">
          <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-500/70 hover:bg-slate-900"
          >
            返回工具目录
          </button>
          <h1 className="text-lg font-semibold text-slate-50">{tool.title}</h1>
          <p className="mt-2 text-sm text-slate-400">该工具当前未提供 Markdown 详情，可在目录中查看基础信息。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center self-start rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:border-sky-500/70 hover:bg-slate-900"
        >
          返回工具目录
        </button>
        <div className="mb-3">
          <h1 className="text-lg font-semibold text-slate-50">{tool.title}</h1>
          <p className="mt-1 text-xs text-slate-400">文件：{tool.path}</p>
        </div>
        <div className="h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <MarkdownViewer title={tool.title} markdown={tool.markdown ?? ''} />
        </div>
      </div>
    </div>
  )
}

export default ToolDetail

