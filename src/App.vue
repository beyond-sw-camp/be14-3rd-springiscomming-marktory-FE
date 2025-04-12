<template>
  <header>
    <nav>
      <RouterLink to="/" />
    </nav>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />

  </header>
  
  <main id="app" class="theme-dark">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>


<style>
html,
body,
#app {
  background-color: #000;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
