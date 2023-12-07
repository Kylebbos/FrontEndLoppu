import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/FrontEndLoppu/', // Add this row and use your own repository name
  plugins: [react()],
  test: {
  globals: true,
  environment: 'jsdom',
  },
  })
