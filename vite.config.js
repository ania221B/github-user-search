import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginPurgeCss from 'vite-plugin-purgecss-updated-v5'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/github-user-search/',
  plugins: [react(), pluginPurgeCss()]
})
