<template>
  <div class="root-container">
    <div class="navbar">
      <span class="home-link-group">
        <RouterLink :to="$localePath" class="global-home-link">
          <img class="logo" src="/logo.png" :alt="$siteTitle" />
        </RouterLink>
      </span>
      <el-input v-model="fileName" placeholder="文件"></el-input>
      <el-button class="navbar-button" plain @click="triggerOpen">{{
        loading ? '取消' : '打开'
      }}</el-button>
      <el-button class="navbar-button" type="primary" @click="triggerSubmit"
        >提交</el-button
      >
      <el-avatar class="navbar-button"></el-avatar>
    </div>
    <main
      class="home"
      v-loading="loading"
      element-loading-text="正在加载文档。在网络质量并不优秀的地区，这可能需要最多30秒时间。"
    >
      <div class="container">
        <div class="container-column">
          <MonacoEditor
            class="monaco"
            :value="fileValue"
            language="markdown"
            @change="triggerValueChange"
            :options="monacoOptions"
          />
        </div>
        <div
          class="container-column"
          style="flex: 1; overflow: auto;"
          v-html="renderedValue"
        ></div>
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
import mdit from 'markdown-it'
import mdit_anchor from 'markdown-it-anchor'
import mdit_container from 'markdown-it-container'
import mdit_emoji from 'markdown-it-emoji'
import mdit_toc from 'markdown-it-table-of-contents'
import MonacoEditor from '@theme/components/MonacoEditor'

export default {
  name: 'Editor',

  components: {
    MonacoEditor
  },

  data() {
    return {
      // Page Loading
      loading: true,

      // Page Data
      fileName: '',
      fileValue: localStorage.fileValue || '',
      renderedValue: '',

      // Axios
      cancelSource: this.$http.CancelToken.source(),

      // MD Renderer & Editor
      mdRenderer: mdit({
        html: true,
        linkify: true,
        typographer: true
      })
        .use(mdit_anchor)
        .use(mdit_container)
        .use(mdit_emoji)
        .use(mdit_toc),
      monacoOptions: {
        wordWrap: 'on',
        wordWrapMinified: false,
        wrappingIndent: 'same',
        acceptSuggestionOnCommitCharacter: true,
        acceptSuggestionOnEnter: true,
        accessibilityHelpUrl: 'https://vbox.moe/VBox/Theme/Editor.html',
        autoClosingBrackets: 'always',
        autoClosingOvertype: 'always',
        autoClosingQuotes: 'always',
        automaticLayout: true,
        colorDecorators: true,
        cursorBlinking: 'smooth',
        formatOnPaste: true,
        parameterHints: {
          cycle: true
        },
        showUnused: true,
        smoothScrolling: true,
        tabCompletion: 'on'
      }
    }
  },

  async mounted() {
    if ('file' in this.$route.query && this.$route.query.file !== '') {
      this.fileName = this.$route.query.file
      this.triggerFetch()
    } else this.loading = false
    if (this.fileValue && this.fileValue !== '')
      this.renderedValue = this.mdRenderer.render(this.fileValue)
  },

  methods: {
    triggerValueChange(value) {
      this.fileValue = value
      localStorage.fileValue = this.fileValue
      this.renderedValue = this.mdRenderer.render(value)
    },

    async triggerFetch() {
      this.loading = true
      if (!this.fileName || this.fileName === '') return
      const result = await this.$http
        .get(
          `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/${this
            .$site.themeConfig.repo || ''}/master${
            this.$site.themeConfig.docsDir
              ? '/' + this.$site.themeConfig.docsDir
              : ''
          }${this.fileName}`,
          {
            cancelToken: this.cancelSource.token
          }
        )
        .catch((e) => {
          if (this.$http.isCancel(e)) {
            this.loading = false
          } else {
            this.$notify.error({
              title: '错误',
              message:
                '在加载时发生了错误。您仍然可以使用就地编辑器。错误的信息：' +
                (e && e.message ? e.message : '未知'),
              duration: 10000
            })
            this.loading = false
          }
        })
      if (!result) return
      this.fileValue = result.data
      if (!this.fileValue || this.fileValue === '') return
      this.renderedValue = this.mdRenderer.render(this.fileValue)
      this.loading = false
    },

    triggerOpen() {
      if (!this.loading) {
        this.triggerFetch()
      } else {
        this.cancelSource.cancel()
        this.loading = false
      }
    },

    triggerSubmit() {}
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
  align-items center
  .logo
    height $navbarHeight - 1.4rem
    vertical-align top
    margin-top -1px
.navbar-button
  margin 0 10px
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
  background-color #00000000
.home
  margin 3.6rem 0
  display block
  height 100%
.container
  display flex
  flex-direction row
  height 100%
.container-column
  height 88%
  width 50%
  margin 1rem
  box-shadow 0 0 5px 0 black
.root-container
  height 100vh
  width 100vw
  display block
  overflow hidden
.monaco
  display block
  height 100%
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
