<template>
    <div class="modal-overlay">
      <div class="modal-container">
        <h2 class="modal-title">정말 제거하시겠어요?</h2>
        <div class="modal-actions">
          <button class="cancel-button" @click="closeModal">취소</button>
          <button class="confirm-button" @click="confirmDelete">확인</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close', 'confirm']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const confirmDelete = () => {
    emit('confirm');
  };
  </script>
  
  <style scoped>
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
  
  .modal-container {
    background: #3a3a3a;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal-title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  
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
  
  .confirm-button {
    background: #fd6f22;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
  }
  
  .cancel-button:hover {
    background: #a1a1a1;
  }
  
  .confirm-button:hover {
    background: #e65c00;
  }
  </style>
  