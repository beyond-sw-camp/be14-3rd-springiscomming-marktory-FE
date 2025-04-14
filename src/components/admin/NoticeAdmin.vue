<template>
  <div class="notice-container">
    <!-- 본문 -->
    <main class="main-content">
      <!-- 정렬 버튼 자리 -->
      <div class="sort-dropdown">
        <button class="sort-btn">정렬 ⌄</button>
      </div>

      <!-- 공지사항 테이블 -->
      <table class="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="notice in paginatedNotices"
            :key="notice.id"
            @click="goToDetail(notices.id)"
            class="clickable-row"
          >
            <td>{{ notice.id }}</td>
            <td>{{ notice.title }}</td>
            <td>{{ notice.date }}</td>
            <td>{{ notice.writer }}</td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 컴포넌트 -->
      <AdminPagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:page="currentPage = $event"
      />

      <!-- 작성 버튼 -->
      <div class="write-button">  
        <button @click="isInsertOpen = true">작성하기</button>
      </div>

      <!-- 모달 컴포넌트 -->
      <NoticeInsert
        v-if="isInsertOpen"
        v-model="isInsertOpen"
        @submit="handleInsertSubmit"/>
    </main>

    <!-- 상세페이지가 라우터로 뜰 수 있도록 -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminPagination from '../admin/AdminPagination.vue'
import NoticeInsert from '../admin/NoticeInsert.vue'

const router = useRouter()
const isInsertOpen = ref(false)   // 모달 상태
const notices = ref([])           // 공지사항 데이터 (로컬 상태)
const currentPage = ref(1)        // 페이지네이션 설정
const perPage = 10
const totalPages = computed(() => Math.ceil(notices.value.length / perPage))
const paginatedNotices = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return notices.value.slice(start, start + perPage)
})

// ✅ 공지사항 목록을 JSON 서버에서 불러오기
const fetchNotices = async () => {
  try {
    const res = await fetch('http://localhost:3001/notices')
    if (!res.ok) throw new Error('네트워크 오류')
    notices.value = await res.json()
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
}

onMounted(fetchNotices)

// ✅ 공지 등록 후 목록 다시 불러오기
async function handleInsertSubmit(newNotice) {
  const newItem = {
    ...newNotice,
    date: new Date().toISOString().split('T')[0],
    writer: '김민준 관리자'
  }

  try {
    const res = await fetch('http://localhost:3001/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })

    if (!res.ok) throw new Error('등록 실패')

    // 등록 후 목록 갱신
    await fetchNotices()
    isInsertOpen.value = false
  } catch (err) {
    console.error('등록 실패:', err)
  }
}

// ✅ 상세페이지로 이동
function goToDetail(id) {
  router.push(`/adminPage/notice/${id}`)
}
</script>

<style scoped>
.notice-container {
  max-width: 1006px;
  margin-top: 90px;
  padding: 40px;
  height: 578px;
  flex: 1;
  position: relative;
}

.main-content {
  position: relative;
  flex: 1;
  padding: 40px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.sort-btn {
  position: absolute;
  right: 37px;
  padding: 6px 14px;
  border-radius: 8px;
  background-color: #222;
  color: #fff;
  border: 1px solid #666;
  cursor: pointer;
}

/* 테이블 */
.notice-table {
  width: 850px;
  border-collapse: collapse;
  margin-top: 32px;
}

.notice-table th,
.notice-table td {
  padding: 16px;
  border-bottom: 1px solid #555;
  text-align: left;
}

.notice-table th {
  border-bottom: 2px solid #fff;
  font-weight: bold;
}

.notice-table tr:hover {
  background-color: #111;
}

.clickable-row {
  cursor: pointer;
}

/* 작성 버튼 */
.write-button {
  position: absolute;
  bottom: 0px;
  right: 60px;
}

.write-button button {
  background-color: #FD6F22;
  border: none;
  padding: 10px 25px;
  color: #fff;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.write-button button:hover {
  background-color: #fff;
  color: #FD6F22;
}
</style>
