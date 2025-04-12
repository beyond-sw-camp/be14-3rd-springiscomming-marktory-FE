<template>
    <div class="profile-card">
      <img class="profile-img" :src="profileImg" alt="프로필 이미지"/>
      <div class="nickname">{{ nickname }}</div>
      <div class="email">{{ email }}</div>
      <div class="follow-info">
        <img src="../icons/follow-icon.svg"/>      
        <span><strong>{{ followers }}</strong> followers · <strong>{{ following }}</strong> following</span>
      </div>
    </div>
  </template>
    
  <script setup>
    import imgage from './D_profile_IMG.png';
  
    const profileImg = imgage;
    const nickname = 'D';
    const email = 'D1112@mail.com';
    const followers = 122;
    const following = 32;
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
    