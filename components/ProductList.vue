<template>
  <div class="product-list">
    <div class="product-card-list">
      <div
        @click="push(product.regularPath)"
        class="product-card"
        :key="product.productRegularName"
        v-for="product in $page.productData"
      >
        <img
          :src="
            `/Icons/Icons/${product.productRegularName}/${product.productRegularName}.Colored.Transparent.png`
          "
          class="product-card-img"
        />
        <p class="product-card-title">{{ product.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  methods: {
    push(href) {
      this.$router.push(href)
    }
  }
}
</script>

<style lang="stylus">
.product-list
  margin 2rem 0
  padding 2.5rem
  border-top 1px solid $borderColor
.product-card-list
  display flex
  flex-flow wrap
  // justify-content space-between
  // margin-right 3rem
  .product-card
    display flex
    flex-direction row
    align-items center
    justify-items center
    min-width 20rem
    border 1.5px solid $accentColor
    border-radius 15px
    transition box-shadow 0.2s ease-in-out
    padding 0.5rem
    margin 0.8rem
    cursor pointer
.product-card:hover
  box-shadow 0 0 24px 0 $accentColor
.product-card-img
  max-width 120px
  max-height 120px
.product-card-title
  font-size 1.5rem
  overflow-wrap anywhere
</style>
