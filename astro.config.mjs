import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { defineConfig } from 'astro/config';
import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  base: '/astro-sample',
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    plugins: [viteCommonjs()],
    css: {
      postcss: {
        plugins: [tailwind, autoprefixer],
      },
    },
  },
});
