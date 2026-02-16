
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/xMask/', // Соответствует названию вашего репозитория для корректных путей к ассетам
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});
