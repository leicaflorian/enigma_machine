import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir:  process.env.NODE_ENV === 'production'
  ? '/enigma_machine/'
  : '/'
})
