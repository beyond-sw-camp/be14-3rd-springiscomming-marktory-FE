<template>
  <div class="admin-wrapper">
    <main class="notice-content">
      
      <div class="filter">
        <!-- <ArrayModal /> -->
      </div>

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
            @click="goToDetail(notice.id)"
            class="clickable-row"
          >
            <td>{{ notice.id }}</td>
            <td>{{ notice.title }}</td>
            <td>{{ notice.date }}</td>
            <td>{{ notice.writer }}</td>
          </tr>
        </tbody>
      </table>

      <AdminPagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:page="currentPage = $event"
      />

      <div class="write-button">
        <button @click="isInsertOpen = true">작성하기</button>
      </div>

      <NoticeInsert
        v-if="isInsertOpen"
        v-model="isInsertOpen"
        @submit="handleInsertSubmit"
      />
    </main>
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminPagination from '../admin/AdminPagination.vue'
import NoticeInsert from '../admin/NoticeInsert.vue'
const router = useRouter()
const isInsertOpen = ref(false)
const notices = ref([])
const currentPage = ref(1)
const perPage = 10

const totalPages = computed(() => Math.ceil(notices.value.length / perPage))
const paginatedNotices = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return notices.value.slice(start, start + perPage)
})

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

    await fetchNotices()
    isInsertOpen.value = false
  } catch (err) {
    console.error('등록 실패:', err)
  }
}

function goToDetail(id) {
  router.push(`/adminPage/notice/${id}`)
}
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  background-color: #000;
  color: white;
  font-family: 'Helvetica Neue', sans-serif;
  min-height: 100vh;
}

.notice-content {
  flex: 1;
  padding: 40px 60px;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.filter {
  padding-left: 890px;
  padding-top: 20px;
}

.filter-label {
        width: 80px;
        height: 10px;
        padding-left: 14px;
        padding-top: 12px;
        border-radius: 10px;
        font-size: 10px;
        display: inline-block;
        background-color: #424242;
    }

.notice-table {
  position: absolute;
  left: 10px;
  top: 90px;
  width: 100%;
  border-collapse: collapse;
  margin-top: 32px;
}

.notice-table th,
.notice-table td {
  padding: 23px 16px;
  border-bottom: 2px solid #555;
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

.write-button {
  position: fixed;
  bottom: 230px;
  right: 430px;
}

.write-button button {
  background-color: #fd6f22;
  border: none;
  padding: 14px 30px;
  color: #fff;
  border-radius: 9999px;
  font: 80px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.write-button button:hover {
  background-color: #fff;
  color: #FD6F22;
}

.pagination {
      position: absolute;
      bottom: 240px;
      right: 514px;
      justify-content: center;
      margin-top: 40px;
      gap: 12px;
    }
    
    .pagination span {
      padding: 4px 12px;
      border-radius: 6px;
      cursor: pointer;
    }
    
    .pagination .active {
      background-color: #fd6f22;
      color: white;
    }

.notice-table th:last-child,
.notice-table td:last-child {
  min-width: 120px;
  text-align: center;
}

.notice-table td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
