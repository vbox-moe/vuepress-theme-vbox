<template>
  <div class="root-container">
    <div class="navbar">
      <span class="home-link-group">
        <RouterLink :to="$localePath" class="global-home-link">
          <img class="logo" src="/logo.png" :alt="$siteTitle" />
        </RouterLink>
      </span>
      <el-input v-model="fileName" placeholder="文件"></el-input>
      <el-button
        class="navbar-button"
        plain
        @click="triggerOpen"
        :disabled="appbarDisabled"
        >{{ loading ? '取消' : '打开' }}</el-button
      >
      <el-button
        class="navbar-button"
        type="primary"
        @click="submitShow = true"
        :disabled="appbarDisabled"
        >提交</el-button
      >

      <el-dropdown
        class="navbar-button navbar-dropdown"
        trigger="click"
        @command="triggerUserCommand"
      >
        <el-avatar
          class="el-dropdown-link navbar-dropdown-content"
          :src="userAvatar"
        ></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="userToken && userToken !== ''" disabled>{{
            userName
          }}</el-dropdown-item>
          <el-dropdown-item
            v-if="userToken && userToken !== ''"
            divided
            command="logout"
            >退出</el-dropdown-item
          >
          <el-dropdown-item v-else command="login">登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <main
      class="editor-home"
      v-loading="loading"
      element-loading-text="正在加载文档。在网络质量并不优秀的地区，这可能需要最多30秒时间。"
    >
      <div class="container">
        <div class="container-column" ref="editor">
          <MonacoEditor
            class="monaco"
            :value="fileValue"
            language="markdown"
            @change="triggerValueChange"
            @scroll="triggerEditorScroll"
            :options="monacoOptions"
          />
        </div>
        <div
          class="container-column"
          style="flex: 1; overflow: auto;"
          ref="previewer"
        >
          <div style="padding: 1rem" v-html="renderedValue"></div>
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
    <el-drawer
      title="提交"
      :visible.sync="submitShow"
      direction="btt"
      size="90%"
    >
      <transition name="fade" mode="out-in">
        <div v-if="!submitReady" class="submit-container" key="submitNotReady">
          <div>
            <p>要修改的文件：{{ fileName }}</p>
            <p>请审阅您对文件所做的修改。</p>
          </div>
          <div class="submit-monaco">
            <MonacoEditor
              class="monaco"
              :value="fileValue"
              :original="fileOriginalValue"
              :diff-editor="true"
              language="markdown"
              :options="{ ...monacoOptions, readOnly: true, wordWrap: 'off' }"
            />
          </div>
          <div class="submit-appbar">
            <el-button type="primary" @click="submitReady = true"
              >我已完成审阅</el-button
            >
          </div>
        </div>
        <div v-else class="submit-container" key="submitReady">
          <div>
            <p>对 {{ fileName }} 的修改：</p>
            <p>以下均非必填项。</p>
          </div>
          <div class="submit-form">
            <el-form label-width="80px">
              <el-form-item label="标题">
                <el-input v-model="submitTitle"></el-input>
              </el-form-item>
              <el-form-item label="内容概要">
                <el-input v-model="submitBody" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="其他">
                <el-checkbox label="给 VBox 一个 Star！" v-model="submitStar">
                </el-checkbox>
                <p class="submit-thanks">
                  我们由衷地感谢您对 VBox 所做的贡献。
                </p>
              </el-form-item>
            </el-form>
          </div>
          <div class="submit-appbar">
            <el-button plain @click="submitReady = false">返回</el-button>
            <el-button type="primary" @click="triggerSubmit">提交</el-button>
          </div>
        </div>
      </transition>
    </el-drawer>
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

  computed: {
    appbarDisabled() {
      return (
        !this.fileName ||
        this.fileName === '' ||
        !/^\/\w+(\/\w+)+(\.md)$/.test(this.fileName)
      )
    }
  },

  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
  },

  data() {
    return {
      // Page Loading
      loading: true,

      // Page Data
      fileName: '',
      fileOriginalValue: '',
      fileValue: '',
      renderedValue: '',

      // Axios
      cancelSource: this.$http.CancelToken.source(),

      // Timer
      timer: undefined,

      // UserData
      userToken: undefined,
      userName: undefined,
      userAvatar: undefined,
      userMail: undefined,

      // Submit
      submitShow: false,
      submitReady: false,

      // Submit Data
      submitTitle: '',
      submitBody: '',
      submitStar: true,

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
    this.fileValue = localStorage.fileValue || ''
    if (this.fileValue && this.fileValue !== '')
      this.renderedValue = this.mdRenderer.render(this.fileValue)
    // Timer
    const timerFn = async () => {
      await this.fetchUserData().catch(() => {})
      this.timer = setTimeout(timerFn, 2000)
    }
    this.timer = setTimeout(timerFn, 2000)
  },

  methods: {
    triggerValueChange(value) {
      this.fileValue = value
      localStorage.fileValue = this.fileValue
      this.renderedValue = this.mdRenderer.render(value)
    },

    triggerEditorScroll(e) {
      // if (!this.$refs.previewer || !this.$refs.editor) return
      // console.log(JSON.stringify(this.$refs.editor))
      // return
      // console.log((this.$refs.editor.divHeight + e.scrollTop) / e.scrollHeight)
      // const previewer = this.$refs.previewer
      // // previewer.scroll(value)
    },

    triggerPreviewerScroll(value) {},

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
      this.fileOriginalValue = this.fileValue
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

    async triggerSubmit() {
      if (!this.userToken || this.userToken === '') {
        this.$notify.error({
          title: '错误',
          message: '请登录以完成提交。',
          duration: 10000
        })
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '提交'
      })
      this.submitBody =
        '```\n-----BEGIN SUBMIT BLOCK-----' +
        window.btoa(
          unescape(
            encodeURIComponent(
              window.btoa(unescape(encodeURIComponent(this.fileName))) +
                ':' +
                window.btoa(unescape(encodeURIComponent(this.fileValue)))
            )
          )
        ) +
        '-----END SUBMIT BLOCK-----\n```\n' +
        this.submitBody
      if (this.submitTitle === '')
        this.submitTitle = `对 ${this.fileName} 的更改请求`
      const result = await this.$http
        .post(
          `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${this
            .$site.themeConfig.repo || ''}/issues`,
          {
            title: this.submitTitle,
            body: this.submitBody
          },
          {
            headers: {
              Authorization: `token ${this.userToken}`
            }
          }
        )
        .catch((e) => {
          loading.close()
          this.$notify.error({
            title: '错误',
            message:
              '在提交时发生了错误。请重试提交。错误的信息：' +
              (e && e.message ? e.message : '未知'),
            duration: 10000
          })
        })
      if (!result || !result.data || !result.data.html_url) return
      await this.$http(
        `https://cors-anywhere.herokuapp.com/https://api.github.com/user/starred/${this
          .$site.themeConfig.repo || ''}`,
        {
          method: 'PUT',
          headers: {
            'Content-Length': 0,
            Authorization: `token ${this.userToken}`
          }
        }
      ).catch(() => {})
      loading.close()
      this.submitShow = false
      this.$notify({
        title: '成功',
        message: '更改请求已经成功提交。感谢您的贡献。现在，您可以关闭此页面。',
        duration: 10000,
        type: 'success'
      })
    },

    async triggerUserCommand(command) {
      if (command === 'login') {
        window.open(
          '/login',
          '登录 | VBox',
          'menubar=0,location=0,scrollbars=0,toolbar=0,width=600,height=600'
        )
      } else if (command === 'logout') {
        localStorage.token = ''
        await this.fetchUserData()
      }
    },

    async fetchUserData() {
      if (!localStorage.token || localStorage.token === '') {
        this.userToken = ''
        this.userName = ''
        this.userAvatar = ''
        this.userMail = ''
        return
      }
      if (localStorage.token === this.userToken) return
      const result = await this.$http
        .get(
          'https://cors-anywhere.herokuapp.com/https://api.github.com/user',
          { headers: { Authorization: `token ${localStorage.token}` } }
        )
        .catch(() => {})
      if (!result || !result.data || !result.data.login) return
      const {
        name: userName,
        email: userMail,
        avatar_url: userAvatar
      } = result.data
      this.userName = userName
      this.userAvatar = userAvatar
      this.userMail = userMail
      this.userToken = localStorage.token
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
  .el-input, .el-input__inner
    font-size 1.5rem
    font-weight bold
    margin 0 1rem
    border none
    background-color #00000000
  .el-dropdown-link
    cursor pointer
.navbar-button
  margin 0 10px
.navbar-dropdown
  display flex
.navbar-dropdown-content
  align-self center
.link-slash
  margin-left 0.3rem
  margin-right 0.5rem
.mobile-placeholder
  position absolute
  width 100vw
  height 100vh
  display none
  user-select none
.editor-home
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
  box-shadow 0 0 5px 0 #646464
.root-container
  height 100vh
  width 100vw
  display block
  overflow hidden
.monaco
  display block
  height 100%
  width 100%
.submit-container
  margin 0 2rem
  margin-bottom 2rem
  height 70%
.submit-monaco
  height 100%
  box-shadow 0 0 5px 0 #646464
.submit-form
  height 100%
.submit-appbar
  display flex
  padding 1rem
  justify-content center
.submit-thanks
  color #cccccc
  user-select none
.fade-enter-active, .fade-leave-active
  transition opacity 0.2s
.fade-enter, .fade-leave-to
  opacity 0
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
