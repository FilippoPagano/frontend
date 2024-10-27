import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'public'),
      '@src': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@contexts': resolve(__dirname, 'src/contexts'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@layout': resolve(__dirname, 'src/layout'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@routes': resolve(__dirname, 'src/routes'),
      '@store': resolve(__dirname, 'src/store'),
      '@theme': resolve(__dirname, 'src/theme'),
      '@types': resolve(__dirname, 'src/types'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
