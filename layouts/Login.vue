<template>
  <div class="theme-container" :class="pageClasses">
    <Navbar :show-scroll="false" />
    <div
      class="sb-container"
      v-loading="loading"
      :element-loading-text="loadingText"
    >
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

  data() {
    return {
      loading: true,
      loadingText: '加载'
    }
  },

  async mounted() {
    const dev = location.hostname === 'localhost'
    if ('code' in this.$route.query && this.$route.query.code !== '') {
      this.loadingText = '登录'
      const result = await this.$http
        .post(
          'https://github.com/login/oauth/access_token',
          {
            client_id:
              this.$site.themeConfig.oauth[dev ? 'dev' : 'prod'].id || '',
            client_secret:
              this.$site.themeConfig.oauth[dev ? 'dev' : 'prod'].secret || '',
            code: this.$route.query.code
          },
          {
            headers: {
              Accept: 'application/json'
            }
          }
        )
        .catch((e) => {
          this.loading = false
          this.$notify.error({
            title: '错误',
            message:
              '在登录时发生了错误。您可以重试。错误的信息：' +
              (e && e.message ? e.message : '未知'),
            duration: 10000
          })
        })
      if (result && 'data' in result && 'access_token' in result.data) {
        localStorage.token = result.data.access_token
        window.close()
      } else {
        this.loading = false
        this.$notify.error({
          title: '错误',
          message: '在登录时发生了错误。您可以重试。',
          duration: 10000
        })
      }
    } else this.loading = false
  },

  methods: {
    triggerOAuth() {
      const dev = location.hostname === 'localhost'
      const url = new URL('https://github.com/login/oauth/authorize')
      url.searchParams.set(
        'client_id',
        this.$site.themeConfig.oauth[dev ? 'dev' : 'prod'].id || ''
      )
      url.searchParams.set('scope', 'public_repo')
      window.location = url.toString()
    },

    triggerBot() {
      localStorage.token = this.$site.themeConfig.publicToken || ''
      window.close()
    }
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
