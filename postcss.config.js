module.exports = {
  plugins: {
      '@fullhuman/postcss-purgecss': {
          content: [
              './themes/{insert_theme_name_here}/layouts/**/*.html', 
              './themes/{insert_theme_name_here}/assets/js/*.js',
              './themes/{insert_theme_name_here}/static/js/*.js',
              './layouts/**/*.html',
              './static/js/*.js'
            ],
          whitelist: [
              'highlight',
              'language-bash',
              'pre',
              'video',
              'code',
              'content',
              'h3',
              'h4',
              'ul',
              'li'
          ]
      },
      autoprefixer: {},
      cssnano: {preset: 'default'}
  }
};



const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  safelist: [],
});

module.exports = {
  plugins: [
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
