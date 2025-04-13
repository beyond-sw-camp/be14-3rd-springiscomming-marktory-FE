<template>
  <div class="setting-page">
    <AppHeader />
    <Setting />
    <SideFooter />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import SideFooter from "../components/footer/SideFooter.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import Setting from '../components/setting/setting.vue';
</script>

<style scoped>
.setting-page {
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  background-color: #000000;
  color: white;
  position: relative;
  overflow-x: hidden;
}

@media (max-width: 1440px) {
  .setting-page {
    width: 100%;
    min-width: 360px;
  }
}
</style>