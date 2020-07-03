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
        :alt="author.name"
        :key="author.email"
        v-for="author in $page.authors"
      />
      ·
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style>
.header-bar {
  color: #818a94;
}
</style>
