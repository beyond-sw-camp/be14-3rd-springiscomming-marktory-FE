<template>
  <div class="profile-card">
    <img class="profile-img" :src="member.image" alt="프로필 이미지"/>
    <div class="nickname">{{ member.nickname }}</div>
    <div class="email">{{ member.email }}</div>
    <div class="follow-info">
      <img src="../../assets/icons/follow-icon.svg"/>      
      <span><strong>{{ member.followerCount }}</strong> followers · <strong>{{ member.followingCount }}</strong> following</span>
    </div>
  </div>
</template>
    
<script setup>
  import { ref, onMounted } from 'vue';
  
  const member = ref({});

  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3001/members/11');

      if (!res.ok) {
        throw new Error('서버 응답 실패');
      }

      const data = await res.json();
      member.value = data;
    } catch (err) {
      console.error('Fetch 실패:', err);
    }
  });

</script>
  
<style scoped>
  .profile-card {
    width: 262px;
    height: 361px;
    margin-top: 404px;
    padding-top: 19px;
    background-color: black;
    position: fixed;
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

  .follow-info {
    font-size: 14px;
    color: white;
  }
</style>
  