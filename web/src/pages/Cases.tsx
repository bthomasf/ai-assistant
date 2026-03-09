import type { FC } from 'react'
import { Link } from 'react-router-dom'
import cases from '../data/cases.json'

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

const Cases: FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">案例浏览</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            按时间线查看已沉淀的实战案例，快速复用过去的 AI 使用经验。数据来源于
            <code className="mx-1 rounded bg-slate-900 px-1.5 py-0.5 text-xs text-sky-300">cases/</code>
            目录。
          </p>
        </header>

        {cases.length === 0 ? (
          <p className="text-sm text-slate-400">当前还没有沉淀任何案例，可以从一次值得记录的 AI 协助开始。</p>
        ) : (
          <ul className="space-y-3 text-sm">
            {cases.map((item) => (
              <li key={`${item.date}-${item.title}`}>
                <Link
                  to={`/cases/${encodeURIComponent(item.path)}`}
                  className="block rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-left shadow-sm transition hover:border-sky-500/60 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-50">{item.title}</h2>
                      <p className="mt-1 text-xs text-slate-400">
                        阶段：{stageLabels[item.stage] ?? (item.stage || '未知阶段')}
                      </p>
                    </div>
                    {item.date && (
                      <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                    <div className="flex flex-wrap items-center gap-1">
                      {item.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-sky-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <span className="truncate text-slate-500">文件：{item.path}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Cases

