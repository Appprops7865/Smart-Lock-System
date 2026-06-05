import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 💡 Tells the builder to use relative paths for AppMint
  build: {
    outDir: 'dist'
  }
})
