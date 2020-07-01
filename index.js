const path = require('path')

// Theme API.
module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      (base) => themeConfig.locales[base].algolia
    )

  return {
    alias() {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },

    plugins: [
      '@vuepress/active-header-links',
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      '@vuepress/back-to-top',
      '@vuepress/medium-zoom',
      '@vuepress/pwa',
      'vuepress-plugin-table-of-contents',
      'vuepress-plugin-alias',
      'vuepress-plugin-reading-time',
      'vuepress-plugin-autometa',
      'tabs',
      'code-switcher',
      'vuepress-plugin-auto-sidebar',
      'vuepress-plugin-right-anchor',
      'authors',
      'seo',
      ['vuepress-plugin-code-copy', true],
      [
        'autonav',
        {
          enable: true
        }
      ],
      [
        'vuepress-plugin-clean-urls',
        {
          normalSuffix: '',
          indexSuffix: '',
          notFoundPath: '/404.html'
        }
      ],
      [
        'container',
        {
          type: 'tip',
          defaultTitle: {
            '/': '提示',
            '/en/': 'TIP'
          }
        }
      ],
      [
        'container',
        {
          type: 'warning',
          defaultTitle: {
            '/': '注意',
            '/en/': 'WARNING'
          }
        }
      ],
      [
        'container',
        {
          type: 'danger',
          defaultTitle: {
            '/': '警告',
            '/en/': 'WARNING'
          }
        }
      ],
      [
        'container',
        {
          type: 'details',
          before: (info) =>
            `<details class="custom-block details">${
              info ? `<summary>${info}</summary>` : ''
            }\n`,
          after: () => '</details>\n'
        }
      ],
      ['smooth-scroll', true]
    ]
  }
}
