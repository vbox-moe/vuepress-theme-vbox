<template>
  <mavon-editor />
</template>

<script>
import { mavonEditor } from '@theme/components/MavonEditor/src/index.js'
import '@theme/components/MavonEditor/src/css/markdown.css'
import '@theme/components/MavonEditor/src/css/mavon-editor.css'
import '@theme/components/MavonEditor/src/css/md.css'
import '@theme/components/MavonEditor/src/css/scroll.css'

export default {
  name: 'Editor',
  components: {
    mavonEditor
  }
}
</script>

<style>
</style>
