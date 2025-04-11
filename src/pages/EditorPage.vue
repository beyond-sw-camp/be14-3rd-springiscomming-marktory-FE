<template>
    <div>
        <!-- 출간 버튼 -->
        <button class="publish-btn" @click="showSheet = true">출간하기</button>

        <!-- 바텀시트 -->
        <PublishBottomSheet :visible="showSheet" :title="form.title" @close="showSheet = false"
            @publish="handlePublish" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PublishBottomSheet from '../components/post/PublishBottomSheet.vue';

// 출간 시트 열기 상태
const showSheet = ref(false);

// 게시물 제목 예시
const form = ref({
    title: 'BEYOND 주간 회고 템플릿'
});

// 출간 완료 핸들러
const handlePublish = (data) => {
    console.log('출간 데이터:', data);
    // 예: API 호출 또는 저장 처리 가능
};
</script>

<style scoped>
.publish-btn {
    padding: 0.6rem 1.5rem;
    background-color: #f58220;
    color: #000;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
</style>