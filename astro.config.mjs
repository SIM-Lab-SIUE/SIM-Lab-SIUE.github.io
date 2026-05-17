import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aura-lab-siue.github.io',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
