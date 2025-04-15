<template>
  <div class="member-wrapper">
    <!-- 정렬 버튼 -->
    <!-- <div class="filter">
        <ArrayModal />
    </div> -->

    <!-- 회원 테이블 -->
    <table class="member-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>닉네임</th>
          <th>이메일</th>
          <th>생년월일</th>
          <th>가입일</th>
          <th>탈퇴일</th>
          <th>계정상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in paginatedMembers" :key="member.id">
          <td>{{ index + 1 + (currentPage - 1) * pageSize }}</td>
          <td>{{ member.name }}</td>
          <td>{{ member.nickname }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.birth }}</td>
          <td>{{ member.joined }}</td>
          <td>{{ member.withdrawn || '-' }}</td>
          <td>
            <button
              class="status-btn"
              :class="{
                active: member.status === '활성화',
                disabled: member.status === '이용제한',
                withdrawn: member.status === '탈퇴회원'
              }"
              @click="toggleStatus(member)"
              :disabled="member.status === '탈퇴회원'"
            >
              {{ member.status }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">«</button>
      <span
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">»</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArrayModal from '../ArrayModal.vue'

const members = ref([
  { id: 1, name: '김돌돌', nickname: 'Tim', email: 'tim123@naver.com', birth: '2000-02-02', joined: '2024-12-08', status: '활성화' },
  { id: 2, name: '강돌돌', nickname: 'D', email: 'D123@naver.com', birth: '2001-03-05', joined: '2025-01-01', status: '활성화' },
  { id: 3, name: '이돌돌', nickname: 'Moris', email: 'moris@naver.com', birth: '2002-03-04', joined: '2025-01-05', status: '활성화' },
  { id: 4, name: '한돌돌', nickname: 'R', email: 'R1424@naver.com', birth: '2002-05-30', joined: '2025-02-02', status: '활성화' },
  { id: 5, name: '양돌돌', nickname: 'dong', email: 'dong@naver.com', birth: '2002-09-08', joined: '2025-02-06', status: '활성화' },
  { id: 6, name: '지돌돌', nickname: 'GDGD', email: 'DG@naver.com', birth: '1998-09-06', joined: '2025-02-15', status: '활성화' },
  { id: 7, name: '임빵빵', nickname: 'dkgm', email: 'dkgm@naver.com', birth: '1993-06-20', joined: '2025-02-15', status: '이용제한' },
  { id: 8, name: '주돌돌', nickname: 'dubu', email: 'dubu@naver.com', birth: '1997-03-02', joined: '2025-02-16', withdrawn: '2025-03-02', status: '탈퇴회원' },
  { id: 9,  name: '곽병길', nickname: 'Kwu', email: 'kwu2@naver.com', birth: '2000-06-02', joined: '2025-03-20', status: '활성화' },
  { id: 10, name: '강병길', nickname: 'monkeyD', email: 'DD@naver.com', birth: '2003-05-05', joined: '2025-03-22', status: '활성화' },
  { id: 11, name: '한병길', nickname: 'tommy', email: 'tom@naver.com', birth: '1992-03-04', joined: '2025-03-25', status: '활성화' },
  { id: 12, name: '정병길', nickname: 'rain', email: 'rain@naver.com', birth: '2000-05-23', joined: '2025-03-27', status: '활성화' },
  { id: 13, name: '이병길', nickname: 'mo', email: 'mo@naver.com', birth: '2001-07-03', joined: '2025-03-29', status: '활성화' },
  { id: 14, name: '주병길', nickname: 'dkgus', email: 'dk@naver.com', birth: '1994-09-04', joined: '2025-03-30', status: '활성화' },
  { id: 15, name: '강하루', nickname: 'haru', email: 'haru1@naver.com', birth: '1992-03-20', joined: '2025-04-01', status: '활성화' },
  { id: 16, name: '강하들', nickname: 'hadol', email: 'hadol@naver.com', birth: '2003-04-02', joined: '2025-04-02', status: '활성화' }
])

const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() => Math.ceil(members.value.length / pageSize))

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return members.value.slice(start, start + pageSize)
})

const goToPage = (page) => {
  currentPage.value = page
}
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function toggleStatus(member) {
  if (member.status === '활성화') {
    member.status = '이용제한'
  } else if (member.status === '이용제한') {
    member.status = '활성화'
  }
}
</script>

<style scoped>
.member-wrapper {
  position: relative;
  padding: 40px 60px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #000;
  color: white;
  font-family: 'Helvetica Neue', sans-serif;
  min-height: 100vh;
}

/* .filter {
  position: absolute;
  right: 20px;
  top: 40px;
  padding: 0;
} */

.member-table {
  position: absolute;
  left: 10px;
  top: 90px;
  width: 100%;
  border-collapse: collapse;
  margin-top: 32px;
}

.member-table th,
.member-table td {
  padding: 16px;
  border-bottom: 1px solid #555;
  text-align: left;
}

.member-table th {
  font-weight: bold;
  border-bottom: 2px solid #fff;
}

.member-table tr:hover {
  background-color: #111;
}

/* 상태 버튼 */
.status-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  border: none;
  cursor: default;
  min-width: 80px;
}
.status-btn.active {
  background-color: #00d09e;
  color: #fff;
}
.status-btn.disabled {
  background-color: #555;
  color: #aaa;
}
.status-btn.withdrawn {
  background-color: #e53935;
  color: #fff;
}

.pagination {
  position: absolute;
  bottom: 240px;
  right: 514px;
  justify-content: center; 
  margin-bottom: 40px;
  gap: 12px;
}
.pagination span,
.pagination button {
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #2b2b2b;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
.pagination span.active {
  background-color: #FD6F22;
}
.pagination button:disabled {
  background-color: #444;
  cursor: default;
}
</style>
