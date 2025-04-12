<template>
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="dark-modal">
        <h2 class="modal-title" v-if="title">{{ title }}</h2>
  
        <div class="modal-content-scroll">
          <slot />
        </div>
  
        <div class="modal-buttons">
          <slot name="action-buttons" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      default: '',
    },
  })
  </script>
  
  <!-- ❗ scoped 제거됨 -->
  <style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
  
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dark-modal {
    background: #222;
    color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
  
    width: 430px;
    height: 70vh;
    max-height: 70vh;
    padding: 24px;
    border-radius: 12px;
  
    display: flex;
    flex-direction: column;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .modal-content-scroll {
    flex: 1;
    overflow-y: auto;
    padding-right: 10px;
    font-size: 13px;
    line-height: 1.8;
  }
  
  .modal-content-scroll h3 {
    font-size: 15px;
    margin-top: 24px;
    font-weight: bold;
  }
  
  .modal-content-scroll ul {
    padding-left: 20px;
    margin: 12px 0;
  }
  
  .modal-content-scroll li {
    margin-bottom: 10px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-evenly;
    margin-top: 24px;
    width: 100%;
  }
  </style>
  