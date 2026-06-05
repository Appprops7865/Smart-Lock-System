import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '', // 💡 This converts all asset connections into dead-relative strings, bypassing folder bugs
  build: {
    outDir: 'dist'
  }
})
