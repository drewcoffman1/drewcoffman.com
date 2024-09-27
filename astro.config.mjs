import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { BASE_URL } from './src/consts';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: BASE_URL,
  integrations: [mdx(), sitemap(), react()]
});