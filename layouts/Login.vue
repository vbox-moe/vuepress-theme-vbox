<template>
  <div class="theme-container" :class="pageClasses">
    <Navbar />
    <div class="sb-container">
      <div class="sb-button-container" @click="triggerOAuth">
        <p class="sb-title">→ 使用 GitHub 登录</p>
        <p class="sb-description">您的贡献将会被记录在 VBox 仓库内。</p>
      </div>
      <div class="sb-button-container" @click="triggerBot">
        <p class="sb-title">→ 继续但不登录</p>
        <p class="sb-description">您将会以匿名的方式继续。</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'

export default {
  name: 'Login',

  components: {
    Navbar
  },

  methods: {
    triggerOAuth() {},

    triggerBot() {}
  }
}
</script>

<style lang="stylus">
.sb-container
  margin 2rem
  margin-top 3.6rem
  padding 3rem
.sb-button-container
  margin 12px
  margin-top 24px
  padding 12px
  border 1.5px solid $accentColor
  border-radius 15px
  transition box-shadow 0.2s ease-in-out
  cursor pointer
.sb-button-container:hover
  box-shadow 0 0 24px 0 $accentColor
.sb-title
  margin 10px
  font-size 24px
  font-weight bold
.sb-description
  margin 8px 10px
</style>
