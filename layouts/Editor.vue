<template>
  <div class="root-container">
    <div class="navbar">
      <span class="home-link-group">
        <RouterLink :to="$localePath" class="global-home-link">
          <img class="logo" src="/logo.png" :alt="$siteTitle" />
        </RouterLink>
      </span>
      <el-input v-model="fileName" placeholder="文件"></el-input>
      <el-button class="navbar-button" plain>打开</el-button>
      <el-button class="navbar-button" type="primary">提交</el-button>
      <el-avatar class="navbar-button"></el-avatar>
    </div>
    <main class="home">
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
          style="flex: 1; overflow: auto; height: 90%;"
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
      fileName: '',
      fileValue: '',
      renderedValue: '',
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
    if ('file' in this.$route.query) this.fileName = this.$route.query.file
    if (!this.fileName) return
    const loading = this.$loading({
      lock: true,
      text: '正在加载文档。在网络质量并不优秀的地区，这可能需要最多30秒时间。'
    })
    this.fileValue = (
      await this.$http.get(
        `https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/${this
          .$site.themeConfig.repo || ''}/master${
          this.$site.themeConfig.docsDir
            ? '/' + this.$site.themeConfig.docsDir
            : ''
        }${this.fileName}`
      )
    ).data
    this.renderedValue = this.mdRenderer.render(this.fileValue)
    loading.close()
  },

  methods: {
    triggerValueChange(value) {
      this.fileValue = value
      this.renderedValue = this.mdRenderer.render(value)
    }
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
