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
<style>
/* 공통 다크 테마 */
.theme-dark {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  font-family: 'Helvetica Neue', sans-serif;
}

/* 링크 등은 기본으로 흰색 */
a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Bootstrap 오버라이드 */
body {
  background-color: #000;
  color: #fff;
  margin: 0;
}
</style>
