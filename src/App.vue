<template>

  <header>
    <nav>
      <RouterLink to="/" />
    </nav>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />

  </header>
  
  <main id="app" class="theme-dark">
    <RouterView />
    <!-- <SideFooter/> -->
  </main>

</template>

<script setup>
import { RouterView } from 'vue-router';
// import SideFooter from "@/components/footer/SideFooter.vue";
</script>

<style>
html,
body{
  scrollbar-gutter: stable;
  background-color: black;
}
#app {
  background-color: #000;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
