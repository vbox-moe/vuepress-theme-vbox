<template>
  <main class="home" aria-labelledby="main-title">
    <Content class="theme-default-content custom" />

    <div v-if="$page.frontmatter.footer" class="footer">
      {{ $page.frontmatter.footer }}
    </div>
  </main>
</template>

<script>
export default {
  name: 'GlobalIndex'
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
</style>
