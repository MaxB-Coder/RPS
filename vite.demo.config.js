import { defineConfig } from 'vite';
import { ejsScreens } from './demo/precompile.js';

// Builds the static game in demo/ for the portfolio's live demo.
// DEMO_BASE is the sub-path it is served from, e.g. /demos/rpssl/.
export default defineConfig({
  root: 'demo',
  base: process.env.DEMO_BASE ?? '/',
  publicDir: '../public',
  plugins: [ejsScreens()],
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
  },
});
