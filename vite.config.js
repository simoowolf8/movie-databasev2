import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Replace with your preferred host (e.g., 'localhost')
    port: 3000,      // Set the port to 3000
  },
})