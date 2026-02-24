import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖЛИВО: Без цього білд зламається на GitHub Pages.
  base: '/qr-code-gen/', 
})