import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This switches between dev server and production servers
const API_URI = process.env.DEPLOYMENT_ENVIRONMENT === 'production'
  ? 'https://api.mechmania.ca'
  : 'http://127.0.0.1:8000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this is correct
    rollupOptions: {
      input: 'index.html',
    },
  },

  define: {
        __SiteBase__: JSON.stringify(API_URI),
  }
})