import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 部署到 Nginx 子路径 /ai-assistant 时使用
  base: '/ai-assistant/',
})
