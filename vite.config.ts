import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'finance-frontend'), // Set finance-frontend as root
  build: {
    outDir: resolve(__dirname, 'dist'), // Output directory for build files
  },
})
