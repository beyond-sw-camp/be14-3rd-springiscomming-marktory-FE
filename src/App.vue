<template>
  <header>
    <nav>
      <RouterLink to="/" />
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>
<style scoped></style>
