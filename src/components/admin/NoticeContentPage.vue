<template>
    <div class="notice-detail-wrapper">
        <h1 class="notice-title">{{ notice.title }}</h1>
        <p class="notice-date">{{ notice.date }}</p>
            <div class="action-buttons">
                <button @click="isEditOpen = true">수정</button>
                <button @click="isDeleteOpen = true">삭제</button>
            </div>
            <hr class="divider" />
        <div class="notice-body" v-html="notice.content" />
            <hr class="divider" />
    <button class="btn-back" @click="goBack">목록</button>
    </div>
    <!-- 수정 모달 -->
    <NoticeEditModal
        v-if="isEditOpen"
        v-model="isEditOpen"
        :notice="notice"
        @submit="handleEditSubmit"/>  

        <!-- ✅ 삭제 모달 (페이지 내에 직접 구현) -->
    <div class="modal-overlay" v-if="isDeleteOpen">
        <div class="modal-box">
            <p class="message">해당 게시글을 삭제 하시겠습니까?</p>
            <div class="buttons">
            <button class="cancel" @click="isDeleteOpen = false">취소</button>
            <button class="delete" @click="handleDelete">삭제</button>
            </div>
        </div>
    </div>
</template> 

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import NoticeEditModal from '../admin/NoticeEditModal.vue'

    // 라우터 사용
    const route = useRoute()
    const router = useRouter()

    // 모달 상태
    const isEditOpen = ref(false)
    const isDeleteOpen = ref(false)

    // 공지 데이터 상태
    const notice = ref({
        title: '',
        date: '',
        content: '',
        writer: ''
    })
// id 기반 데이터 fetch
// ✅ id 값을 ref로 선언할 필요 없음! 그냥 const로 받아오기
onMounted(async () => {
    try {
    const id = route.params.id
    console.log('📌 route.params.id:', id)

    // 🛠️ id가 없을 경우 예외 처리
    if (!id) throw new Error('ID 파라미터가 없습니다.')

    const res = await fetch(`http://localhost:3001/notices/${id}`)
    console.log('요청할 주소:', `http://localhost:3001/notices/${id}`)
    if (!res.ok) throw new Error('데이터 요청 실패')

    const data = await res.json()
    console.log('📦 받은 데이터:', data)

    notice.value = data
    } catch (err) {
    console.error('❌ 공지사항 불러오기 실패:', err)
    }
})

    // 수정 모달 저장
    function handleEditSubmit(updated) {
    notice.value.title = updated.title
    notice.value.content = updated.content
    }

    // function goToDetail(id) {
    // router.push(`/adminPage/notice/${id}`)
    // }

    // 삭제
    async function handleDelete() {
        try {
                const res = await fetch(`http://localhost:3001/notices/${notice.value.id}`, {
                method: 'DELETE'
            })

    if (!res.ok) throw new Error('삭제 실패')

    // 삭제 완료 후 목록 페이지로 이동
    isDeleteOpen.value = false
    router.push('/adminPage/notice')
        } catch (err) {
    console.error('공지사항 삭제 실패:', err)
    alert('삭제에 실패했습니다.')
    }
}

    // 뒤로가기
    const goBack = () => {
    router.push('/adminPage/notice')
    }
</script>

<style scoped>
    .notice-detail-wrapper {
        width: 968px;
        height: 550px;
        margin: 64px auto;
        padding: 32px;
        background-color: #000;
        color: white;
    }

    .notice-title {
        font-size: 32px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 16px;
    }

    .notice-date {
        font-size: 14px;
        text-align: center;
        color: #aaa;
        margin-bottom: 32px;
    }

    .divider {
        border: none;
        border-top: 1px solid #fff;
        margin-bottom: 32px;
    }

    .action-buttons {
        display: flex;
        gap: 8px;
        margin-left: 780px;
    }

    .action-buttons button {
        background: none;
        border: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
    }

    .action-buttons button:hover {
        color: #FD6F22;
    }

    .notice-body {
        line-height: 1.8;
        white-space: pre-line;
        font-size: 16px;
        margin-bottom: 48px;
    }

    .btn-back {
        display: block;
        margin: 0 auto;
        padding: 12px 32px;
        background-color: #FD6F22;
        color: #fff;
        border: none;
        border-radius: 24px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
    }

    .btn-back:hover {
        background-color: #fff;
        color: #FD6F22
    }

    /* 삭제 모달 스타일 */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-box {
        background-color: #3b3b3b;
        border-radius: 12px;
        padding: 32px;
        text-align: center;
        color: #fff;
        width: 320px;
    }

    .message {
        margin-bottom: 24px;
        font-size: 16px;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        gap: 16px;
    }

    .cancel {
        background-color: #C4C4C4;
        border: none;
        padding: 10px 24px;
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }

    .cancel:hover {
        background-color: #fff;
        color: #C4C4C4
    }

    .delete {
        background-color: #E53935;
        border: none;
        padding: 10px 24px;
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }

    .delete:hover {
        background-color: #fff;
        color: #E53935;
    }

</style>
