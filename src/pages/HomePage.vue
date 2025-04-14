<template>
  <div>
    <header class="header">
      <AppHeader />
    </header>

    <main class="main-content">
      <div class="sort-wrapper">
        <ArrayModal />
      </div>
    </main>

    <footer>
      <SideFooter />
      <AppFooter />
    </footer>
  </div>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
import SideFooter from "../components/footer/SideFooter.vue";
import AppFooter from "../components/footer/AppFooter.vue";
import ArrayModal from "../components/ArrayModal.vue";
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: black;
  z-index: 9999;
}

.main-content {
  padding-top: 70px;
  overflow: visible;
}

.sort-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px 0 40px; /* top:20px → 원하는 만큼 조정 */
  margin-top: 20px; /* 👈 또는 이거로도 가능 */
}
</style>