import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
export default defineConfig({
  plugins: [
    react(),
    reactRefresh()
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://xxxxxxxxx.vercel.app/',
        changeOrigin: true,
      },
    },
  },
})
