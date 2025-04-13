<template>
    <div class="notice-container ">
      <!-- 본문  -->
      <main class="main-content">
        <div class="">
          <h2>공지사항 목록</h2>
          <div class="sort-dropdown">
            <button class="sort-btn">정렬 ⌄</button>
          </div>
        </div>
  
        <!-- 공지 테이블 -->
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
            <tr v-for="(notice, index) in paginatedNotices":key="index"
              class="clickable-row"
              @click="goToDetail((currentPage - 1) * perPage + index + 1)">
              <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
              <td>{{ notice.title }}</td>
              <td>{{ notice.date }}</td>
              <td>{{ notice.writer }}</td>
            </tr>
          </tbody>
        </table>

        <!-- ✅ 고정 영역 (이름변경필요)-->
        <AdminPagination
          :currentPage="currentPage"
          :totalPages="totalPages"
            @update:page="currentPage = $event"/>
        <!-- 작성 버튼 -->
        <div class="write-button">
          <button @click="goToWrite">작성하기</button>
        </div>
      </main>
    </div>
</template>
  
<script setup>
  import { ref, computed } from 'vue'
  import AdminPagination from '../admin/AdminPagination.vue'

  const currentPage = ref(1)
  const perPage = 10
  const totalPages = computed(() => Math.ceil(notices.value.length / perPage))
  const paginatedNotices = computed(() => {
      const start = (currentPage.value - 1) * perPage
      return notices.value.slice(start, start + perPage)
  })

  // 공지사항 데이터
  const notices = ref([
      { title: '시스템 점검시간 공지 안내', date: '2025-01-05', writer: '김민준 관리자' },
      { title: '서비스 업데이트 공지', date: '2025-01-06', writer: '김민준 관리자' },
      { title: '이용 약관 및 정책 변경 안내', date: '2025-01-09', writer: '김민준 관리자' },
      { title: '버그 및 오류 수정 안내', date: '2025-02-09', writer: '김민준 관리자' },
      { title: '회원 계정 보안 강화 안내', date: '2025-02-14', writer: '김민준 관리자' },
      { title: '광고 및 스팸 게시글 단속 공지', date: '2025-02-22', writer: '김민준 관리자' },
      { title: '일시적인 접속 장애 안내', date: '2025-02-28', writer: '김민준 관리자' },
      { title: '닉네임 및 프로필 정책 변경 안내', date: '2025-03-05', writer: '김민준 관리자' },
      { title: '부가서비스 점검 공지', date: '2025-03-10', writer: '김민준 관리자' },
      { title: 'test10', date: '2025-03-10', writer: '김민준 관리자' },
      { title: 'test11', date: '2025-03-10', writer: '김민준 관리자' }
    ])

  function goToWrite() {
  router.push('/adminPage/noticeEdit')
  }

  function goToDetail(id) {
  router.push(`/adminPage/notice/${id}`)
  }
</script>
  
<style scoped>
  .notice-container {
    flex-direction: column;
    height: 1024px;
    width: 1176x;
    flex: 1;
    position: relative;
  }

  .menu {
    margin-top: 48px;
  }
  
  .menu-title {
    color: #FD6F22;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .menu-item {
    color: #ccc;
    margin-bottom: 12px;
    cursor: pointer;
  }
  
  .user-info {
    text-align: center;
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
  }
  
  /* 본문 */
  .main-content {
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
    height: 578p;
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
  
  /* 페이지네이션 */
  .pagination {
    position: absolute;
    bottom: 200px;
    right: 513px;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
  }
  
  .pagination span {
    padding: 4px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .pagination .active {
    background-color: #FD6F22;
  }
  
  /* 작성 버튼 */
  .write-button {
  position: absolute;
  bottom: 220px;
  right: 110px;
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