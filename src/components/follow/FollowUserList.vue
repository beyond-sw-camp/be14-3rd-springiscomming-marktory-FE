<!-- FollowUserList.vue -->
<template>
  <div class="overlay">
    <div class="follow-box">
      <div class="header">
        <h2>{{ title }}</h2>
        <span class="close" @click="$emit('close')">✕</span>
      </div>
      <div class="user-list">
        <FollowUser
          v-for="user in users"
          :key="user.id"
          :user="user"
          :type="title"
        />
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import FollowUser from './FollowUser.vue';
  const props = defineProps({
    users: Array,
    title: String
  });
</script>
  
<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  }

  .follow-box {
    width: 564px;
    height: 550px;
    background: #424242;
    border-radius: 20px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    color: white;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header h2 {
    font-size: 32px;
    margin: 0;
  }

  .close {
    font-size: 24px;
    cursor: pointer;
  }

  .user-list {
    margin-top: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .user-list::-webkit-scrollbar {
    display: none;
  }
</style>