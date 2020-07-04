<template>
  <main class="global-index" aria-labelledby="main-title">
    <section class="global-index-section">
      <div class="global-index-section-card">
        <p class="global-index-section-card-title">{{ $page.authorCount }}</p>
        <p class="global-index-section-card-descrip">名活跃维护者</p>
      </div>
      <div class="global-index-section-card">
        <p class="global-index-section-card-title">{{ $site.pages.length }}</p>
        <p class="global-index-section-card-descrip">篇文档在库</p>
      </div>
    </section>

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
    flex-direction row-reverse
    color lighten($textColor, 75%)
    font-weight bold
    user-select none
    .global-index-section-card
      padding 1rem
      text-align right
      .global-index-section-card-title
        font-size 4rem
        margin 0
        padding 0
      .global-index-section-card-descrip
        font-size 2rem
        margin 0
        padding 0
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
