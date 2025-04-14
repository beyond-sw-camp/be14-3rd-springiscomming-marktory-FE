<template>
  <div class="admin-wrapper">
    <AppHeader />
      <div class="admin-body">
        <AdminSidebar
          :activeMenu="activeMenu"
          @update:menu="updateMenu"/>
            <main class="admin-content">
              <router-view />
            </main>
      </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 공통 레이아웃 컴포넌트
import AdminSidebar from '../components/admin/AdminSidebar.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/footer/AppFooter.vue'

const route = useRoute()
const router = useRouter()
const activeMenu = ref('')

// 주소 변경에 따라 활성 메뉴 자동 설정
watch(route, () => {
  const path = route.path
  if (path.includes('/notice')) {
    activeMenu.value = '공지사항 관리'
  } else if (path.includes('/report')) {
    activeMenu.value = '신고 관리'
  } else if (path.includes('/member')) {
    activeMenu.value = '회원 관리'
  }
})

// 사이드바에서 메뉴 클릭 시 경로 이동
function updateMenu(menu) {
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
}

/* 콘텐츠 영역 */
.admin-content {
  flex: 1;
  padding: 40px 60px;
  box-sizing: border-box;
}
</style>
