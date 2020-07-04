<template>
  <main class="global-index" aria-labelledby="main-title">
    <section class="global-index-section"></section>

    <Content class="theme-default-content custom" />

    <ProductList />

    <div v-if="$page.frontmatter.footer" class="footer">
      {{ $page.frontmatter.footer }}
    </div>
  </main>
</template>

<script>
import ProductList from '@theme/components/ProductList.vue'

export default {
  name: 'GlobalIndex',

  components: { ProductList }
}
</script>

<style lang="stylus">
.global-index
  padding $navbarHeight 2rem 0
  // max-width $homePageWidth
  margin 0px auto
  display block
  .global-index-section
    height 30vh
    display flex
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
