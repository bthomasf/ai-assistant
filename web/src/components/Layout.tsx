import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

type LayoutProps = {
  children: ReactNode
}

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/lifecycle', label: '生命周期视图' },
  { to: '/tools', label: 'AI 工具目录' },
  { to: '/cases', label: '案例浏览' },
  { to: '/prompts', label: 'Prompt 集锦' },
]

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <aside className="hidden w-60 flex-col border-r border-slate-800 bg-slate-950/80 px-4 py-5 md:flex">
        <div className="mb-6 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-sm font-semibold text-slate-950">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-50">AI-Assistant</p>
            <p className="text-xs text-slate-500">个人 AI 助手知识库</p>
          </div>
        </div>
        <nav aria-label="主导航" className="space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition cursor-pointer',
                  isActive
                    ? 'bg-slate-900 text-sky-400 border border-sky-500/60'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-slate-50 border border-transparent hover:border-slate-700',
                ].join(' ')
              }
            >
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-sm font-semibold text-slate-950">
              AI
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">AI-Assistant</p>
              <p className="text-[11px] text-slate-500">个人 AI 助手</p>
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm transition hover:border-sky-500/60 hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              V1.0 · 骨架搭建中
            </button>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default Layout

