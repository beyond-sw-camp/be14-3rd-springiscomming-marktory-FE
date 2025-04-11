<template>
  <div id="app" class="theme-dark">
    <RouterView />
  </div>
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
