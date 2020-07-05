<template>
  <div class="theme-container" :class="pageClasses">
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'

export default {
  name: 'Login',

  components: {
    Navbar
  }
}
</script>
