import type { FC } from 'react'
import lifecycle from '../data/lifecycle.json'

const Lifecycle: FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">工作生命周期视图</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            按阶段浏览从需求到学习的完整工作流，每个阶段都可以挂接对应的 AI 工具、案例和 Prompt。
          </p>
        </header>

        <ol className="relative border-l border-slate-800 pl-4 text-sm sm:pl-6">
          {lifecycle.map((phase, index) => (
            <li key={phase.stage} className="mb-6 ml-1 last:mb-0">
              <div className="absolute -left-[9px] mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" aria-hidden="true" />
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-sm transition hover:border-sky-500/60 hover:bg-slate-900/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      阶段 {String(index + 1).padStart(2, '0')} · {phase.stage}
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-slate-50">{phase.title}</h2>
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300">
                    文档：{phase.path}
                  </span>
                </div>
                {phase.description && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{phase.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Lifecycle

