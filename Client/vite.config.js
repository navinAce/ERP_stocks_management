import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        // Proxy any API request starting with `/api` to the backend server
        '/api': {
            target: 'https://erp-stocks-management.onrender.com', // backend server address
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before sending request to backend
        },
    },
},
})
