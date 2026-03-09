import type { FC } from 'react'
import { useState } from 'react'
import tools from '../data/tools.json'
import MarkdownViewer from '../components/MarkdownViewer'

const categoryLabels: Record<string, string> = {
  platforms: 'AI 平台类',
  'ide-plugins': 'IDE 集成类',
  'mcp-services': 'MCP 服务类',
  skills: 'Skills 能力类',
  agents: '自动化脚本 / Agent 类',
}

type Tool = (typeof tools)[number]

const ToolCatalog: FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

  const groups = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = []
    acc[tool.category].push(tool)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">AI 工具目录</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            按工具形态进行一级分类，再按适用阶段做二级映射。所有数据均来自项目根目录下的
            <code className="mx-1 rounded bg-slate-900 px-1.5 py-0.5 text-xs text-sky-300">catalog/</code>
            Markdown 卡片。
          </p>
        </header>

        <div className="space-y-6">
          {Object.entries(groups).map(([category, items]) => (
            <section key={category} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-50">
                    {categoryLabels[category] ?? category} · {items.length} 个
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">目录：catalog/{category}/</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => {
                  const isMarkdownTool =
                    (tool.category === 'mcp-services' || tool.category === 'skills') && Boolean(tool.markdown)

                  const handleClick = () => {
                    if (!isMarkdownTool) return
                    setSelectedTool(tool)
                  }

                  return (
                    <article
                      key={tool.id}
                      role={isMarkdownTool ? 'button' : undefined}
                      tabIndex={isMarkdownTool ? 0 : -1}
                      onClick={handleClick}
                      onKeyDown={(event) => {
                        if (!isMarkdownTool) return
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setSelectedTool(tool)
                        }
                      }}
                      className={[
                        'group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm shadow-sm transition',
                        'hover:bg-slate-900/80',
                        isMarkdownTool
                          ? 'cursor-pointer hover:border-sky-500/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
                          : 'hover:border-sky-500/40',
                      ].join(' ')}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-medium text-slate-50">{tool.title}</h3>
                          <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300">
                            {tool.category}
                          </span>
                        </div>
                        {tool.stages && tool.stages.length > 0 && (
                          <p className="mt-1 text-[11px] text-slate-400">
                            适用阶段：
                            {tool.stages.join(' / ')}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
                        <span className="truncate text-slate-500">来源：{tool.path}</span>
                        <div className="flex items-center gap-1">
                          {isMarkdownTool && (
                            <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-emerald-300">
                              查看说明
                            </span>
                          )}
                          {tool.url && (
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[11px] text-sky-300 transition hover:border-sky-500/70 hover:bg-slate-900"
                              onClick={(event) => {
                                event.stopPropagation()
                              }}
                            >
                              打开
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
      {selectedTool && selectedTool.markdown && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-slate-950/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="关闭说明面板"
            className="hidden h-full flex-1 cursor-default md:block"
            onClick={() => setSelectedTool(null)}
          />
          <div className="flex h-full w-full max-w-xl flex-col border-l border-slate-800 bg-slate-950 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  工具说明
                </p>
                <p className="truncate text-sm font-semibold text-slate-50">
                  {selectedTool.title}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-slate-500">
                  {selectedTool.path}
                </p>
              </div>
              <button
                type="button"
                aria-label="关闭"
                className="inline-flex h-7 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-2 text-[11px] text-slate-300 shadow-sm transition hover:border-sky-500/70 hover:bg-slate-900"
                onClick={() => setSelectedTool(null)}
              >
                关闭
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MarkdownViewer title={selectedTool.title} markdown={selectedTool.markdown} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolCatalog

