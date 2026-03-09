import type { FC } from 'react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cases from '../data/cases.json'
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

const CaseDetail: FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  const item = useMemo(() => {
    const rawId = params.caseId
    if (!rawId) return undefined
    const decoded = decodeURIComponent(rawId)
    return cases.find((c) => c.path === decoded)
  }, [params.caseId])

  const handleBack = () => {
    navigate('/cases')
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
            返回案例列表
          </button>
          <p className="text-sm text-slate-400">未找到对应的案例或该案例尚未生成详情。</p>
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
          返回案例列表
        </button>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">{item.title}</h1>
            <p className="mt-1 text-xs text-slate-400">
              阶段：{stageLabel || '未知阶段'}
              {item.tools.length > 0 && ` · 工具：${item.tools.join(' / ')}`}
            </p>
          </div>
          {item.date && (
            <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300">
              {item.date}
            </span>
          )}
        </div>
        <div className="h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <MarkdownViewer title={item.title} markdown={markdownBody} showHeader={false} />
        </div>
      </div>
    </div>
  )
}

export default CaseDetail

