<template>
  <div class="sb-container" @click="push">
    <p class="sb-title">{{ title }}</p>
    <p class="sb-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'SelectButton',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: true
    }
  },
  methods: {
    push() {
      this.$router.push(this.href)
    }
  }
}
</script>

<style lang="stylus">
.sb-container
  margin 48px 0
  padding 12px
  border 1.5px solid $accentColor
  border-radius 15px
  transition box-shadow 0.2s ease-in-out
  cursor pointer
.sb-container:hover
  box-shadow 0 0 24px 0 $accentColor
.sb-title
  margin 10px
  font-size 24px
  font-weight bold
.sb-description
  margin 8px 10px
</style>
