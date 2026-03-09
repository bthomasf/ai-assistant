import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const lifecyclePhases = [
  { id: 1, key: 'design', name: '需求分析与方案设计', description: '从 PRD 到技术方案落地', tools: 4, cases: 0 },
  { id: 2, key: 'coding', name: '编码开发', description: '业务实现与重构优化', tools: 5, cases: 1 },
  { id: 3, key: 'review', name: '代码审查', description: '提交前后的质量把关', tools: 3, cases: 0 },
  { id: 4, key: 'test', name: '测试与质量保障', description: '单测、接口测试与覆盖率', tools: 3, cases: 0 },
  { id: 5, key: 'deploy', name: '部署与运维', description: 'CI/CD 与线上运维', tools: 3, cases: 0 },
  { id: 6, key: 'doc', name: '文档与知识管理', description: '文档撰写与知识沉淀', tools: 4, cases: 0 },
  { id: 7, key: 'debug', name: '问题排查与故障处理', description: '日志分析与故障复盘', tools: 4, cases: 0 },
  { id: 8, key: 'learn', name: '学习与技能提升', description: '技术调研与源码阅读', tools: 3, cases: 0 },
]

const stats = [
  { label: '工具数量', value: '10', sub: '覆盖 5 大类别' },
  { label: '生命周期阶段', value: '8', sub: '从需求到学习' },
  { label: '沉淀案例', value: '1', sub: '计划持续补充' },
  { label: 'Prompt 模板', value: '8', sub: '按阶段分类' },
]

const Dashboard: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-sky-400">AI-Assistant</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              工作生命周期全景视图
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-400">
              以服务端 Java 开发者的日常工作流为主线，串联 AI 工具、案例和 Prompt，形成可视化的个人 AI 能力地图。
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/lifecycle')}
              className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm font-medium text-slate-100 shadow-sm transition hover:border-slate-500 hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              快速上手
            </button>
            <button
              type="button"
              onClick={() => navigate('/tools')}
              className="inline-flex items-center rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              查看项目结构
            </button>
          </div>
        </header>

        <main className="space-y-8">
          <section aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">
              项目统计
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => {
                const isToolsCard = item.label === '工具数量'
                const handleClick = () => {
                  if (isToolsCard) navigate('/tools')
                }
                return (
                  <button
                    key={item.label}
                    type={isToolsCard ? 'button' : 'button'}
                    onClick={handleClick}
                    className={[
                      'group flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-left shadow-sm transition',
                      isToolsCard
                        ? 'cursor-pointer hover:border-sky-500/60 hover:bg-slate-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
                        : 'hover:border-slate-700/80 hover:bg-slate-900/70',
                    ].join(' ')}
                  >
                    <p className="text-xs font-medium text-slate-400">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-50">{item.value}</p>
                    <p className="mt-1 text-xs text-slate-500 group-hover:text-slate-300">{item.sub}</p>
                  </button>
                )
              })}
            </div>
          </section>

          <section aria-labelledby="lifecycle-heading" className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 id="lifecycle-heading" className="text-base font-semibold text-slate-50">
                  工作生命周期（8 阶段）
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  以时间轴方式组织的完整工作链路，每个阶段都关联推荐 AI 工具、案例和 Prompt。
                </p>
              </div>
              <button
                className="mt-2 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-100 transition hover:border-sky-500/60 hover:bg-slate-900/90 sm:mt-0"
                type="button"
                onClick={() => navigate('/lifecycle')}
              >
                查看生命周期视图
              </button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {lifecyclePhases.map((phase) => (
                <article
                  key={phase.id}
                  className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-4 shadow-sm ring-0 transition hover:border-sky-500/70 hover:bg-slate-900/80 hover:ring-1 hover:ring-sky-500/40"
                >
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      阶段 {phase.id.toString().padStart(2, '0')}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-50">{phase.name}</h3>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-3">{phase.description}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                      {phase.tools} 个工具
                    </span>
                    <span>{phase.cases} 条案例</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="activity-heading"
            className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)]"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
              <h2 id="activity-heading" className="text-base font-semibold text-slate-50">
                最近案例
              </h2>
              <p className="mt-1 text-sm text-slate-400">沉淀真实场景中的 AI 使用经验，形成可复用模式。</p>
              <div className="mt-4 divide-y divide-slate-800 text-sm">
                <button
                  type="button"
                  onClick={() => navigate('/cases')}
                  className="flex w-full items-start justify-between gap-3 rounded-lg border border-transparent px-1 py-1 text-left transition hover:border-sky-500/60 hover:bg-slate-900/70"
                >
                  <div>
                    <p className="font-medium text-slate-50">使用 Cursor Agent 批量重构服务层代码</p>
                    <p className="mt-1 text-xs text-slate-400">
                      将 20+ 个 Service 的异常处理统一为 BizException + ErrorCode 模式。
                    </p>
                    <p className="mt-1 text-xs text-slate-500">阶段：编码开发 · 工具：Cursor Agent / GitLab MCP</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                    2026-03-09
                  </span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
              <h2 className="text-base font-semibold text-slate-50">Prompt 集锦概览</h2>
              <p className="mt-1 text-sm text-slate-400">
                按阶段分类的高质量 Prompt 模板，支持即取即用。
                <button
                  type="button"
                  onClick={() => navigate('/prompts')}
                  className="ml-2 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-2 py-0.5 text-[11px] font-medium text-sky-300 transition hover:border-sky-500/70 hover:bg-slate-900"
                >
                  查看全部
                </button>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <p className="font-medium text-slate-50">需求拆解与边界识别</p>
                  <p className="mt-1 text-xs text-slate-400">帮助快速理解 PRD，识别模糊点和风险。</p>
                </li>
                <li className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <p className="font-medium text-slate-50">CRUD 全套代码生成</p>
                  <p className="mt-1 text-xs text-slate-400">基于 DDL 一次性生成 Entity / Mapper / Service / Controller。</p>
                </li>
                <li className="rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2">
                  <p className="font-medium text-slate-50">异常堆栈分析与故障复盘</p>
                  <p className="mt-1 text-xs text-slate-400">分析根因、触发条件，并输出标准复盘报告结构。</p>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

