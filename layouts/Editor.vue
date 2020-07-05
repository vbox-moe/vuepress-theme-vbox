<template>
  <div>
    <header class="navbar">
      <span class="home-link-group">
        <RouterLink :to="$localePath" class="global-home-link">
          <img class="logo" src="/logo.png" :alt="$siteTitle" />
        </RouterLink>
      </span>
    </header>
    <div class="mobile-placeholder">
      <img
        src="/logo.png"
        width="200px"
        height="200px"
        class="mobile-placeholder-element"
      />
      <p class="mobile-placeholder-element">就地编辑器需要更大的屏幕支持。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor'
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
.mobile-placeholder
  position absolute
  width 100vw
  height 100vh
  display none
  user-select none
@media (max-width: $MQMobile)
  .navbar
    display none
  .mobile-placeholder
    display flex
    flex-direction column
    align-items center
    color $accentColor
    font-size 2rem
    font-weight bold
    overflow-wrap anywhere
    .mobile-placeholder-element
      margin 2rem
</style>
