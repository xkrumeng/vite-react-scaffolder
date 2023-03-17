import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import ViteEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteEslint({
      failOnError: false,
    }),
  ],
})
