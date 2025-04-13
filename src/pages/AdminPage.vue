<template>
  <div class="admin-wrapper theme-dark">
    <!-- 상단 헤더 -->
    <AppHeader />

    <!-- 본문: 사이드바 + 콘텐츠 -->
    <div class="admin-body">
      <AdminSidebar
        :activeMenu="activeMenu"
        @update:menu="updateMenu"
      />
      <main class="admin-content">
        <router-view />
      </main>
    </div>

    <!-- 하단 푸터 -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminSidebar from '../components/AdminSidebar.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const route = useRoute()
const router = useRouter()
const activeMenu = ref('')

// URL에 따라 메뉴 강조
watch(route, () => {
  if (route.path.includes('/notice')) {
    activeMenu.value = '공지사항 관리'
  } else if (route.path.includes('/report')) {
    activeMenu.value = '신고 관리'
  } else if (route.path.includes('/member')) {
    activeMenu.value = '회원 관리'
  }
})

const updateMenu = (menu) => {
  activeMenu.value = menu
  const routes = {
    '공지사항 관리': '/adminPage/notice',
    '신고 관리': '/adminPage/report',
    '회원 관리': '/adminPage/member'
  }
  router.push(routes[menu])
}
</script>

<style scoped>
/* 전체 래퍼 */
.admin-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  color: white;
  background-color: black;
}

/* 본문 레이아웃: 사이드바 + 콘텐츠 */
.admin-body {
  display: flex;
  flex: 1;
}

/* 콘텐츠 영역 */
.admin-content {
  flex: 1;
  padding: 40px 60px;
  box-sizing: border-box;
}
</style>
