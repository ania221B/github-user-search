const purgecss = require('@fullhuman/postcss-purgecss').default

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    ...(isProduction
      ? [
          purgecss({
            content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
            safelist: ['flow'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ]
      : [])
  ]
}
