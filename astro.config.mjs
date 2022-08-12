import { defineConfig } from 'astro/config';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  base: '/astro-sample',
  vite: {
    assetsInclude: ['**/*.glb'],
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
  },
});
