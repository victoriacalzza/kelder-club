import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tempoVitePlugin } from 'tempo-sdk'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tempoVitePlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
