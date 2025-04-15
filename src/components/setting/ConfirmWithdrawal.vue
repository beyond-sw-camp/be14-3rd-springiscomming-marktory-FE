<template>
    <div class="modal-overlay">
      <div class="modal-container">
        <h2 class="modal-title">정말 탈퇴하시겠어요?</h2>
        <p class="modal-description">
          탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
        </p>
        <div class="modal-actions">
          <button class="cancel-button" @click="closeModal">취소</button>
          <button class="confirm-button" @click="confirmWithdrawal">탈퇴</button>
        </div>
      </div>
      <WithdrawalEnd v-if="isWithdrawalEndVisible" @close="closeWithdrawalEnd" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import WithdrawalEnd from '@/components/setting/WithdrawalEnd.vue';
  import { useMemberStore } from '../../stores/memberStore';

  const isWithdrawalEndVisible = ref(false);
  const memberStore = useMemberStore();
  const emit = defineEmits(['close', 'confirm']);

  // 모달 닫기
  const closeModal = () => {
    emit('close'); // 부모 컴포넌트에 모달 닫기 이벤트 전달
  };
  
  // 탈퇴 확인
  const confirmWithdrawal = async () => {
    const memberId = memberStore.user?.id;

    if (!memberId) {
      alert('회원 정보가 없습니다.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/members/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'is_delete',
          delete_date: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('탈퇴 요청 실패');
      }

      console.log('회원 탈퇴 완료');
      isWithdrawalEndVisible.value = true;

    } catch (err) {
      console.error('탈퇴 실패:', err);
      alert('탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  const closeWithdrawalEnd = () => {
    isWithdrawalEndVisible.value = false;
    emit('close');
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
    margin-bottom: 16px;
  }
  
  /* 모달 설명 */
  .modal-description {
    color: white;
    font-size: 14px;
    margin-bottom: 24px;
    line-height: 1.5;
  }
  
  /* 버튼 컨테이너 */
  .modal-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  
  /* 취소 버튼 */
  .cancel-button {
    background: #b3b3b3;
    color: black;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
  }
  
  /* 탈퇴 버튼 */
  .confirm-button {
    background: #ff0000;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
  }
  
  /* 버튼 호버 효과 */
  .cancel-button:hover {
    background: #a1a1a1;
  }
  
  .confirm-button:hover {
    background: #cc0000;
  }
  </style>