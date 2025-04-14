<template>
  <AppHeader />
  <div class="mainpage">
    <header class="header">
      <div class="mainmenu-row">
        <div class="tab" :class="{ active: activeTab === 'post' }" @click="updateRoute('post')">
          <span class="post-label">게시글</span>
        </div>
        <div class="tab" :class="{ active: activeTab === 'template' }" @click="updateRoute('template')">
          <span class="temp-label">템플릿</span>
        </div>
      </div>
      <div class="filter-row">
        <span class="filter-label">전체</span>
      </div>
    </header>
    <main>
      <div class="main-left">
        <div class="dot-buttons">
          <div class="dot all" :class="{ selected: activeDot === 'all' }" @click="updateRoute(activeTab, 'all')">
            <span class="dot-label">전체</span>
          </div>
          <div class="dot subscribe" :class="{ selected: activeDot === 'subscribe' }" @click="updateRoute(activeTab, 'subscribe')">
            <span class="dot-label">구독</span>
          </div>
        </div>
      </div>
      <div class="main-row">
        <div class="main-postcardlist">
          <PostCardList v-if="activeTab === 'post'" :filterType="activeDot" />
          <TempCardList v-else :filterType="activeDot" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch,  defineProps} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import PostCardList from '@/components/mypage/PostCardList.vue'
import TempCardList from '@/components/mypage/TempCardList.vue'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  tab: String,
  filter: String
})

const activeTab = ref(route.params.tab || 'post')
const activeDot = ref(route.params.filter || 'all')

function updateRoute(tab = activeTab.value, filter = activeDot.value) {
  activeTab.value = tab
  activeDot.value = filter
  router.push(`/${tab}/${filter}`)
}
</script>

<style scoped>
.mainpage {
  max-width: 1440px;
  margin: 0 auto;
  color: white;
  background-color: black;
}

.main-row {
  margin-top: -100px;
  display: flex;
  justify-content: center;
}

.main-postcardlist {
  z-index: 1;
}

.mainmenu-row {
  width: 100%;
  padding: 160px 0 8px 50px;
  display: flex;
  align-items: flex-end;
  background-color: black;
}

.main-left {
  position: absolute;
  top: 512px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.dot-buttons {
  width: 100%;
  max-width: 1440px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  pointer-events: auto;
}
.dot {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #424242;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dot-label {
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s;
  white-space: nowrap;
  color: white;
}

.dot:hover {
  background-color: #FD6F22;
  width: 60px;
  height: 30px;
}

.dot:hover .dot-label {
  opacity: 1;
}

.dot.selected {
  background-color: #FD6F22;
  transform: scale(1.05);
  font-weight: bold;
}

.post-label,
.temp-label {
  font-size: 23px;
  align-items: center;
  display: flex;
  color: white;
  cursor: pointer;
  position: relative;
}

.tab {
  margin-left: -40px;
  padding: 40px;
  height: 60px;
  font-size: 23px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.tab .post-label,
.tab .temp-label {
  align-items: center;
  display: flex;
  font-size: 23px;
  border-bottom: 3px solid transparent;
  transition: border-color 0.3s, color 0.3s;
}

.tab:hover .post-label,
.tab:hover .temp-label {
  color: #FD6F22;
}

.tab.active .post-label,
.tab.active .temp-label {
  color: #FD6F22;
}

.tab.active .temp-label::after,
.tab.active .post-label::after {
  content: '';
  position: absolute;
  left: -15px;
  right: -15px;
  bottom: -8px;
  height: 3px;
  background-color: #FD6F22;
  border-radius: 2px;
}

.filter-row {
  justify-content: flex-end;
  display: flex;
  margin-left: auto;
  margin-right: 100px;
}

.filter-label {
  width: 133px;
  height: 52px;
  padding-left: 14px;
  padding-top: 12px;
  border-radius: 10px;
  font-size: 18px;
  display: inline-block;
  background-color: #424242;

}
</style>