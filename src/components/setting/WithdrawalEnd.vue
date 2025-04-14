<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <h2 class="modal-title">회원 탈퇴가 완료되었습니다.</h2>
      <div class="modal-actions">
        <button class="confirm-button" @click="closeModal">확인</button>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const emit = defineEmits(['close']); // 부모 컴포넌트에 이벤트 전달

// 모달 닫기 함수
const closeModal = () => {
  emit('close'); // 부모 컴포넌트에 'close' 이벤트 전달
};
</script>
  
<style scoped>
  /* 모달 오버레이 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  /* 모달 컨테이너 */
  .modal-container {
    background: #3a3a3a;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* 모달 제목 */
  .modal-title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  /* 버튼 컨테이너 */
  .modal-actions {
    display: flex;
    justify-content: center;
  }
  
  /* 확인 버튼 */
  .confirm-button {
    background: #fd6f22;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
  }
  
  /* 버튼 호버 효과 */
  .confirm-button:hover {
    background: #e65c00;
  }
</style>