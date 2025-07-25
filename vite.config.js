import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // allows any host
    allowedHosts: [
      'srs-cafe-portal.onrender.com',  // Add the Render domain
    ],
  },
})
