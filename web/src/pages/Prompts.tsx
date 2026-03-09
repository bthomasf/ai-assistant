import type { FC } from 'react'
import { Link } from 'react-router-dom'
import prompts from '../data/prompts.json'

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

const Prompts: FC = () => {
  const sorted = [...prompts].sort((a, b) => a.stage.localeCompare(b.stage))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Prompt 集锦</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            按生命周期阶段整理的高质量 Prompt 模板，用于快速唤醒合适的 AI 能力。详情内容维护在
            <code className="mx-1 rounded bg-slate-900 px-1.5 py-0.5 text-xs text-sky-300">prompts/&lt;stage&gt;/_index.md</code>
            中。
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => (
            <Link
              key={item.stage}
              to={`/prompts/${item.stage}`}
              className="group block rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm shadow-sm transition hover:border-sky-500/60 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <h2 className="text-sm font-semibold text-slate-50">{stageLabels[item.stage] ?? item.title}</h2>
              <p className="mt-1 text-xs text-slate-400">{item.title}</p>
              <p className="mt-2 text-[11px] text-slate-500">点击查看该阶段全部 Prompt 模板 · 文件：{item.path}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Prompts

