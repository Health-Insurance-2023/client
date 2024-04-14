import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
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
