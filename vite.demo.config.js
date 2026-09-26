import { defineConfig } from 'vite';

// Builds the static game in demo/ for the portfolio's live demo.
// DEMO_BASE is the sub-path it is served from, e.g. /demos/rpsls/.
export default defineConfig({
  root: 'demo',
  base: process.env.DEMO_BASE ?? '/',
  publicDir: '../public',
  build: {
    outDir: '../dist-demo',
    emptyOutDir: true,
  },
});
