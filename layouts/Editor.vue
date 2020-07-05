<template>
  <div class="root-container">
    <div class="navbar">
      <span class="home-link-group">
        <RouterLink :to="$localePath" class="global-home-link">
          <img class="logo" src="/logo.png" :alt="$siteTitle" />
        </RouterLink>
      </span>
      <el-input v-model="fileValue" placeholder="文件"></el-input>
      <el-avatar></el-avatar>
    </div>
    <main class="home">
      <div class="container">
        <div class="container-column">
          <MonacoEditor class="monaco" :value="fileValue" />
        </div>
        <div class="container-column" style="flex: 1;">
          b
        </div>
      </div>
    </main>
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
import MonacoEditor from '@theme/components/MonacoEditor'

export default {
  name: 'Editor',

  components: {
    MonacoEditor
  },

  data() {
    return {
      fileName: '',
      fileValue: ''
    }
  },

  mounted() {
    if ('file' in this.$route.query) this.fileName = this.$route.query.file
  }
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
  display flex
  flex-direction row
  .logo
    height $navbarHeight - 1.4rem
    vertical-align top
    margin-top -1px
.link-slash
  margin-left 0.3rem
  margin-right 0.5rem
.mobile-placeholder
  position absolute
  width 100vw
  height 100vh
  display none
  user-select none
.el-input, .el-input__inner
  font-size 1.5rem
  font-weight bold
  margin 0 1rem
  border none
  background-color transparentify
.home
  padding 3.6rem 0
  margin 0
  display block
  height 100%
.container
  display flex
  flex-direction row
  height 100%
.container-column
  margin 1rem
  width 50%
.root-container
  height 100vh
  width 100vw
  display block
  overflow hidden
.monaco
  display block
  height 90%
  width 100%
@media (max-width: $MQMobile)
  .navbar, .home
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
