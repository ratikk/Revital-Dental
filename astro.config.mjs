import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), sitemap(), react()],
  site: 'https://revitaldentaltempletx.com',
  output: 'static',
  server: {
    host: '0.0.0.0'
  },
  // 1. Force CSS to be inside the HTML (Fixes Render Blocking)
  build: {
    inlineStylesheets: 'always',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    // 2. Ensure images are compressed
    compress: true, 
  }
});
