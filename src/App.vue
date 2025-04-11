<template>
  <header>
    <nav>
      <RouterLink to="/" />
    </nav>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />

  </header>
  <main>
    <RouterView />
  </main>
  
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>
<style scoped>
</style>
