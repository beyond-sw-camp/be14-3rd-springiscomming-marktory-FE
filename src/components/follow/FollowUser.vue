<template>
  <div class="follow-user">
    <img :src="user.image" alt="profile" class="profile-img" />
    <div class="user-info">
      <p class="nickname">{{ user.nickname }}</p>
      <p class="email">{{ user.email }}</p>
    </div>
    <button v-if="type === 'following'" class="follow-btn" @click="toggleFollow" :class="{ following: isFollowing }">
      {{ isFollowing ? '언팔로우' : '팔로우' }}
    </button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const props = defineProps({ 
    user: Object,
    type: String
  });
  const isFollowing = ref(true);
  
  function toggleFollow() {
    isFollowing.value = !isFollowing.value;
  }
</script>

<style scoped>
  .follow-user {
    width: 849px;
    height: 81px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #424242;
    border-bottom: 1px solid #6d6d6d;
    padding-bottom: 10px;
    color: white;
    position: relative;
    overflow: visible;
    max-width: 489px;
  }

  .profile-img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
  }

  .user-info {
    flex: 1;
    margin-left: 16px;
  }

  .nickname {
    max-width: 300px;
    font-size: 24px;
    margin: 0;
  }

  .email {
    max-width: 300px;
    font-size: 16px;
    margin: 0;
    color: gray;
  }

  .follow-btn {
    width: 100px;
    height: 27px;
    font-size: 14px;
    background-color: #6d6d6d;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    z-index: 50;
  }

  .follow-btn:hover {
    background-color: #fd6f22;
    color: black;
  }

  .follow-btn.following:hover {
    background-color: white;
    color: #fd6f22;
  }
</style>