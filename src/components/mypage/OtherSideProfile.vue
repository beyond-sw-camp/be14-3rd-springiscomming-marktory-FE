<template>
    <div class="profile-card">
      <img class="profile-img" :src="member.image" alt="프로필 이미지" />
      <div class="nickname">{{ member.nickname }}</div>
      <div class="email">{{ member.email }}</div>
  
      <!-- 팔로우 토글 버튼 -->
      <button
        class="follow-toggle-btn"
        @click="toggleFollow"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        :style="buttonStyle"
      >
        {{ buttonText }}
      </button>
  
      <div class="follow-info">
        <img src="../../assets/icons/follow-icon.svg" />
        <span class="clickable" @click="openOverlay('followers')">
          <strong>{{ member.followerCount }}</strong> followers
        </span>
        ·
        <span class="clickable" @click="openOverlay('following')">
          <strong>{{ member.followingCount }}</strong> following
        </span>
      </div>
  
      <teleport to="body">
        <FollowUserList
          v-if="showOverlay"
          :title="overlayType"
          :users="overlayUsers"
          @close="showOverlay = false"
        />
      </teleport>
    </div>
  </template>
  
  <script setup>
  import FollowUserList from '../follow/FollowUserList.vue'
  import { ref, computed, onMounted } from 'vue'
  
  const member = ref({})
  const isFollowing = ref(true)
  const hovering = ref(false)
  
  onMounted(async () => {
    const res = await fetch('http://localhost:3001/members?id=11')
    const data = await res.json()
    member.value = data[0]
  })
  
  const showOverlay = ref(false)
  const overlayType = ref('followers')
  const overlayUsers = ref([])
  
  function openOverlay(type) {
    overlayType.value = type
    overlayUsers.value = dummyUsers
    showOverlay.value = true
  }
  
  const dummyUsers = [
    { id: 1, nickname: 'Kasey', email: 'meow@mail.com', image: '/src/assets/follow1.png' },
    { id: 2, nickname: 'Morris', email: 'meow@mail.com', image: '/src/assets/follow2.png' },
    { id: 3, nickname: 'Dong', email: 'rainyday@mail.com', image: '/src/assets/follow3.png' },
    { id: 4, nickname: 'Alex', email: 'woo@mail.com', image: '/src/assets/follow4.png' }
  ]
  
  function toggleFollow() {
    isFollowing.value = !isFollowing.value
    hovering.value = false
  }
  
  const buttonText = computed(() => {
    if (isFollowing.value) return hovering.value ? '언팔로우' : '팔로잉'
    return '팔로우'
  })
  
  const buttonStyle = computed(() => {
    if (!isFollowing.value) {
      return {
        backgroundColor: '#FD6F22',
        color: '#ffffff'
      }
    } else if (hovering.value) {
      return {
        backgroundColor: '#ffffff',
        color: '#FD6F22'
      }
    } else {
      return {
        backgroundColor: '#6d6d6d',
        color: '#ffffff'
      }
    }
  })
  </script>
  
  <style scoped>
  .profile-card {
    width: 262px;
    height: 361px;
    margin-top: 404px;
    padding-top: 19px;
    background-color: black;
    text-align: center;
  }
  
  .profile-img {
    width: 196px;
    height: 196px;
    margin: 0 auto;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .nickname {
    margin-top: 10px;
    padding: 5px 56px;
    font-size: 32px;
    display: inline-block;
    color: white;
    border-bottom: 2px solid #FD6F22;
  }
  
  .email {
    padding-top: 10px;
    padding-bottom: 17px;
    font-size: 16px;
    color: white;
  }
  
  .follow-toggle-btn {
    width: 157px;
    height: 27px;
    margin-bottom: 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .follow-info {
    font-size: 14px;
    color: white;
  }
  
  .clickable {
    cursor: pointer;
    text-decoration: underline;
  }
  </style>
  