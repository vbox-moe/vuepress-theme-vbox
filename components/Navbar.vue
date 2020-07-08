<template>
  <header
    class="navbar"
    :style="
      $page.sidebarItems && $page.sidebarItems.length > 0
        ? ''
        : 'padding-left: 1.5rem'
    "
  >
    <SidebarButton
      v-if="$page.sidebarItems && $page.sidebarItems.length > 0"
      @toggle-sidebar="$emit('toggle-sidebar')"
    />

    <span class="home-link-group">
      <RouterLink :to="$localePath" class="global-home-link">
        <img class="logo" src="/logo.png" :alt="$siteTitle" />
      </RouterLink>

      <span
        v-if="$page.breadcrumbItems && $page.breadcrumbItems.length"
        class="link-slash site-name"
        >/</span
      >

      <RouterLink
        v-if="$page.breadcrumbItems && $page.breadcrumbItems.length"
        :to="$page.breadcrumbItems[0].regularPath"
        class="home-link"
      >
        <span ref="siteName" class="site-name">{{
          $page.breadcrumbItems[0].title
        }}</span>
      </RouterLink>
    </span>

    <div
      class="links"
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': linksWrapMaxWidth + 'px'
            }
          : {}
      "
      v-if="showScroll"
    >
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchBox
        v-else-if="
          $site.themeConfig.search !== false &&
            $page.frontmatter.search !== false
        "
      />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },

  data() {
    return {
      linksWrapMaxWidth: null
    }
  },

  props: {
    showScroll: {
      type: Boolean,
      required: false
    }
  },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      )
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) +
      parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem
.global-home-link
  margin 0
  padding 0
.home-link-group
  margin 0
  padding 0
  display flex
.home-link-group *
  justify-self center
  align-self center
.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  // padding-left 0.6rem
  line-height $navbarHeight - 1.4rem
  a, span, img
    // display inline-block
  .logo
    height $navbarHeight - 1.4rem
    // min-width $navbarHeight - 1.4rem
    // margin-right 0.8rem
    vertical-align top
    margin-top -1px
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex 0 0 auto
      vertical-align top
.link-slash
  margin-left 0.3rem
  margin-right 0.5rem
@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      // width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
