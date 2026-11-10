import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative paths allow this project to work on GitHub Pages under /REPOSITORY/.
  base: './'
});
