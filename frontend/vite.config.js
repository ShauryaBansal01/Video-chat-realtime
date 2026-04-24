import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('react') || id.includes('scheduler')) {
            return 'react-vendor'
          }

          if (id.includes('@tanstack')) {
            return 'query-vendor'
          }

          if (id.includes('stream-chat-react') || id.includes('stream-chat')) {
            return 'stream-chat-vendor'
          }

          if (id.includes('@stream-io/video-react-sdk')) {
            return 'stream-video-vendor'
          }

          if (id.includes('lucide-react')) {
            return 'icons-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
})
