<template>
  <nav v-if="repoLink" class="nav-links"></nav>
</template>

<script>
export default {
  name: 'NavLinks'
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .repo-link
    margin-left 1.5rem
@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0
@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
