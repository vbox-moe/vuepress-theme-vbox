<template>
  <div>
    <p class="breadcrumb-bar header-bar">
      <span
        v-for="breadcrumb in $page.breadcrumbItems"
        :key="breadcrumb.regularPath"
        ><RouterLink :to="breadcrumb.regularPath">{{
          breadcrumb.title
        }}</RouterLink>
        >
      </span>
      <span>{{ $page.title }}</span>
    </p>
    <h1 class="page-header-title">
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

.breadcrumb-bar {
  margin: 0;
  padding: 0;
}

.page-header-title {
  margin-top: 0.8rem;
}
</style>
