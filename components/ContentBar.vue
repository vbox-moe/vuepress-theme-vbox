<template>
  <div class="content-bar">
    <p>在此页面中……</p>

    <li
      class="content-bar-item"
      v-for="(item, index) in listData"
      :key="index"
      @click="itemClick(index, item.slug)"
      :class="{ active: index === activeIndex }"
      :style="
        'padding-left:' +
          ((item.level > 1 ? item.level - 2 : 0) * 12 + 6) +
          'px;'
      "
    >
      {{ item.title }}
    </li>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'ContentBar',
  data() {
    return {
      listData: [],
      activeIndex: null
    }
  },
  watch: {
    '$page.regularPath': function() {
      this.filterDataByLevel()
    }
  },
  methods: {
    itemClick(index, slug) {
      this.activeIndex = index

      window.scrollTo({
        top: document.getElementById(slug).offsetTop,
        behavior: 'smooth'
      })
    },
    filterDataByLevel() {
      this.listData = []

      this.$page.headers.map((item) => {
        if (item.level) this.listData.push(item)
      })

      this.$nextTick(() => {
        this.listData.map((item) => {
          this.getEleById(item.slug).then(
            (el) => (item.offsetTop = el.offsetTop)
          )
        })
      })
    },
    getEleById(id) {
      return new Promise((res) => {
        const t = setInterval(() => {
          const el = document.getElementById(id)
          if (el) {
            clearInterval(t)
            res(el)
          }
        }, 100)
      })
    },
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      )
    }
  },
  mounted() {
    this.filterDataByLevel()

    window.addEventListener(
      'scroll',
      debounce(() => {
        const scrollTop = this.getScrollTop() + 125
        let findItem = false

        this.listData.map((item, index) => {
          if (item.offsetTop && scrollTop >= item.offsetTop) {
            this.activeIndex = index
            findItem = true
          }
        })

        if (!findItem) this.activeIndex = false
      }, 300)
    )
  }
}
</script>

<style lang="stylus">
.content-bar-item
  display block
  padding 4px 0
  font-size 12px
  text-decoration none
  display block
  cursor pointer
  border-left 1px solid #00000000
  &:hover, &.active
    color $accentColor
    border-left 1px solid $accentColor
@media (max-width: $MQMobile)
  .content-bar
    display none
</style>
