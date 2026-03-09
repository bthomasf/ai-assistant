import type { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Lifecycle from './pages/Lifecycle'
import ToolCatalog from './pages/ToolCatalog'
import Cases from './pages/Cases'
import Prompts from './pages/Prompts'
import ToolDetail from './pages/ToolDetail'
import CaseDetail from './pages/CaseDetail'
import PromptDetail from './pages/PromptDetail'

const App: FC = () => {
  // 与 Vite 的 base 保持一致，去掉末尾的斜杠以适配 React Router
  const basename = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')

  return (
    <BrowserRouter basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lifecycle" element={<Lifecycle />} />
          <Route path="/tools" element={<ToolCatalog />} />
          <Route path="/tools/:toolId" element={<ToolDetail />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:caseId" element={<CaseDetail />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/:stage" element={<PromptDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

