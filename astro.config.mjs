import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://solanaforensics.com',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/privacy-policy') &&
        !page.includes('/terms') &&
        !page.includes('/disclaimer'),
    }),
  ],
});
