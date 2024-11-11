import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Use the static adapter for GitHub Pages
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: null
    }),
    paths: {
      // Set base path for GitHub Pages
      base: "/mq-scores"
    },
    prerender: {
      entries: ['*']  // Prerender all routes
    }
  }
};

export default config;
