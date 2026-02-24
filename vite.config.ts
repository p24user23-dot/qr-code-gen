import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖЛИВО: Це ім'я репозиторію для коректних шляхів на GitHub Pages
  base: '/qr-code-gen/', 
})