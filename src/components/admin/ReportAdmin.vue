<template>
    <div class="admin-wrapper">
      <!-- 사이드바 컴포넌트 자리 -->
      
      <main class="report-content">
        <div class="filter">
          <ArrayModal @filter-update="handleFilter"/>
        </div>
  
        <table class="report-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>피신고자</th>
              <th>미처리 신고건</th>
              <th>최종 등록일</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginatedReports" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.date }}</td>
              <td>
                  <button
                    :class="['status-btn', item.status === '처리완료' ? 'done' : 'action']"
                    @click="handleStatusClick(item)">
                    {{ item.status === '처리완료' ? '처리완료' : '내역조회' }}
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 페이지네이션 컴포넌트 -->
        <AdminPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
          @update:page="currentPage = $event"/>
      </main>
        <router-view />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import AdminPagination from '../admin/AdminPagination.vue'
  import ArrayModal from '../ArrayModal.vue'
  
    const router = useRouter()
    const reports = ref([])           // 공지사항 데이터 (로컬 상태)
    const currentPage = ref(1)        // 페이지네이션 설정
    const perPage = 10
    const filterType = ref('등록순') // 'latest' or 'oldest'
    const fetchReports = async () => {
  try {
    const res = await fetch('http://localhost:3001/reports')
    if (!res.ok) throw new Error('네트워크 오류')
    reports.value = await res.json()
  } catch (err) {
    console.error('데이터 불러오기 실패:', err)
  }
}

onMounted(fetchReports)

const sortedReports = computed(() => {
  return [...reports.value].sort((a, b) => {
    return filterType.value === '최신순'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  })
})

const totalPages = computed(() => Math.ceil(sortedReports.value.length / perPage))

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedReports.value.slice(start, start + perPage)
})

function handleFilter(type) {
  filterType.value = type // 'latest' or 'oldest'
  currentPage.value = 1
}

function handleStatusClick(item) {
  if (item.status === '처리완료') {
    router.push(`/memberAdmin/${item.id}`)
  } else {
    router.push(`/reportDetail/${item.id}`)
  }
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
    
    .report-content {
      flex: 1;
      padding: 40px 60px;
      max-width: 1000px;
      margin: 0 auto;
      position: relative;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    
    .report-table {
      position: absolute;
      left: 10px;
      top: 90px;
      width: 100%;
      border-collapse: collapse;
      margin-top: 32px;
    }
    
    .report-table th,
    .report-table td {
      padding: 16px;
      border-bottom: 1px solid #555;
      text-align: left;
    }
    
    .report-table th {
      border-bottom: 2px solid #fff;
      font-weight: bold;
    }
    
    .status-btn {
      padding: 6px 14px;
      font-weight: bold;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    }
    
    .status-btn.done {
      background-color: #666;
      color: #ccc;
    }
    
    .status-btn.action {
      background-color: #fd6f22;
      color: #fff;
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
    
    .arrow {
      color: #ccc;
    }

      /* 처리상태 열 고정 너비 및 정렬 */
    .report-table th:last-child,
    .report-table td:last-child {
      min-width: 120px;
      text-align: center;
    }

    /* 버튼 가운데 정렬 */
    .report-table td:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  