<!-- components/Sidebar.vue -->
<template>
  <aside class="sidebar">
    <nav class="menu">
      <div
        class="menu-item"
        :class="{ active: activeMenu === '공지사항 관리' }"
        @click="goTo('공지사항 관리')">
        공지사항 관리
      </div>

      <div
        class="menu-item"
        :class="{ active: activeMenu === '신고 관리' }"
        @click="goTo('신고 관리')">
        신고 관리
      </div>

      <div
        class="menu-item"
        :class="{ active: activeMenu === '회원 관리' }"
        @click="goTo('회원 관리')">
        회원 관리
      </div>
    </nav>

    <div class="user-info">
      <p>
        <strong class="admin-name">{{ adminName }}</strong> 관리자 님<br />
            좋은 아침이에요! </p>
      <button class="logout-btn">로그아웃</button>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  activeMenu: String,
  adminName: {
    type: String,
    default: '김민준'  // 기본값 (예외 대응용)
  }
})

const emit = defineEmits(['update:menu'])
const router = useRouter()
const routes = {
  '공지사항 관리': '/adminPage/notice',
  '신고 관리': '/adminPage/report',
  '회원 관리': '/adminPage/member'
}

function goTo(menuName) {
  emit('update:menu', menuName)
  router.push(routes[menuName])
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  height: 900px;
  margin-top: 116px;
  padding: 32px 24px;
  border-right: 1px solid #FD6F22;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
}

.menu-item {
  color: #fff;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 23px;
  padding: 4px 8px;
  border-radius: 6px;
}

.menu-item:hover {
  background-color: #fff;
  color: #FD6F22;
}

.menu-item.active {
  font-size: 26px;
  font-weight: bold;
  color: #FD6F22;
}

/* 사용자 정보 */
.user-info {
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  line-height: 1.6;
}

.logout-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background: #FD6F22;
  border: none;
  border-radius: 9999px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.logout-btn:hover {
  background-color: #fff;
  color: #FD6F22;
}

.admin-name {
  color: #FD6F22;
}
</style>
