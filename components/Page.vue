<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <PageHeader />
      <Content />
    </div>

    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageHeader from '@theme/components/PageHeader.vue'
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageHeader, PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.page
  padding-bottom 2rem
  display block
</style>
