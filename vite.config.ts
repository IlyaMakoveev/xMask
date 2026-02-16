
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Критично для GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
