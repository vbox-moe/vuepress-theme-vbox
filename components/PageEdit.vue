<template>
  <footer class="page-edit">
    <div v-if="editLink" class="edit-link">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{
        editLinkText
      }}</a>
      <OutboundLink />
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script>
import isNil from 'lodash/isNil'
import { endingSlashRE, outboundRE } from '../util'

export default {
  name: 'PageEdit',

  computed: {
    lastUpdated() {
      return this.$page.lastUpdated
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    editLink() {
      return '/editor/?file=/' + this.$page.relativePath
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa
@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom 0.5rem
    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
