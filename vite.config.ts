import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      include: ['tailwind.config.js', 'node_modules/**']
    }
  },
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  css: {
    devSourcemap: true
  },
  optimizeDeps: {
    include: ['tailwind-config']
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      'tailwind-config': path.resolve(__dirname, './tailwind.config.js')
    }
  }
})
