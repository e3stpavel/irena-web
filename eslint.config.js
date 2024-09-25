import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
  },
  astro: true,
  // solid: true,
  unocss: true,
  lessOpinionated: true,
}, {
  rules: {
    'antfu/no-top-level-await': 'off',
  },
})
