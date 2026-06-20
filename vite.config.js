import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces (for mobile connection)
    port: 5173,      // Port to run the dev server on
    https: true,     // Enabled HTTPS securely
    proxy: {},       // Force HTTP/1.1 to bypass the Node v22.21.0 HTTP/2 upgrade regression
    strictPort: true
  }
});
