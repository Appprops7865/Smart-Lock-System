import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Smart-Lock-System/', // 💡 This tells Vite explicitly to load assets from your subfolder
  build: {
    outDir: 'dist'
  }
})
