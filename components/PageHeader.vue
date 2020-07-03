<template>
  <div>
    <h1>
      <a :href="'#' + $page.title" class="header-anchor">#</a>
      {{ $page.title }}
    </h1>
    <p class="header-bar">
      {{ $page.readingTime.text }}
      ·
      {{ $page.readingTime.words }} 字 ·
      <img
        :alt="author.username"
        :key="author.email"
        :src="'https://www.gravatar.com/avatar/' + hashEmail(author.email)"
        v-for="author in $page.authors"
        class="header-bar-author-avatar"
        width="20px"
      />
      共 {{ $page.authors.length }} 人
    </p>
  </div>
</template>

<script>
import md5 from 'crypto-js/md5'
export default {
  name: 'PageHeader',
  methods: {
    hashEmail(email) {
      return md5(email)
    }
  }
}
</script>

<style>
.header-bar {
  color: #818a94;
}

.header-bar-author-avatar {
  margin-top: 2px;
  border-radius: 20px;
}
</style>
