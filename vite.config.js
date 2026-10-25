import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static build configuration shared by local previews and GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
  }
})
