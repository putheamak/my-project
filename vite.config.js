import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👇 IMPORTANT: replace "my-project" with your GitHub repo name
  base: '/my-project/',
})