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
      'vuepress-plugin-vbox',
      '@vuepress/active-header-links',
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      '@vuepress/back-to-top',
      [
        '@vuepress/medium-zoom',
        {
          selector:
            '.theme-default-content :not(a) > img :not(.header-bar-author-avatar)'
        }
      ],
      'vuepress-plugin-table-of-contents',
      'vuepress-plugin-alias',
      'vuepress-plugin-reading-time',
      'vuepress-plugin-autometa',
      'tabs',
      'code-switcher',
      'authors',
      ['seo', false],
      ['vuepress-plugin-code-copy', true],
      [
        'autonav',
        {
          enable: true
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
