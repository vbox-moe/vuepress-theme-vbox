<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        返回主页
      </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  '昔人已乘黄鹤去，此地空余404。',
  '看起来这就是传说中的404啊……',
  '这个页面的链接可能已经损坏。'
]

export default {
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
