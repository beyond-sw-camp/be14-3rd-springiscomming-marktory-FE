<template>
    <div class="card-list">
      <PostCard
        v-for="(post, index) in postList"
        :key="index"
        :title="post.title"
        :date="post.date"
        :thumbnailImg="post.thumbnailImg"
        :profileImg="post.profileImg"
        :nickname="post.nickname"/>
    </div>
  </template>
    
  <script setup>
    import PostCard from './PostCard.vue';
    import imgage from '../icons/D_profile_IMG.png';
    
    const postList = [
      {
        title: '파이썬 기초 문법 정리',
        date: '2024-03-01',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Dong'
      },
      {
        title: '여행 준비 체크리스트 ✈️',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '헬스 가이드 💪',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      },
      {
        title: '파이썬 기초 문법 정리',
        date: '2024-03-01',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Dong'
      },
      {
        title: '여행 준비 체크리스트 ✈️',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '헬스 가이드 💪',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      },
      {
        title: '파이썬 기초 문법 정리',
        date: '2024-03-01',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Dong'
      },
      {
        title: '여행 준비 체크리스트 ✈️',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '헬스 가이드 💪',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      },
      {
        title: '여행 준비 체크리스트 ✈️',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '헬스 가이드 💪',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      }
    ];
  </script>
    
  <style scoped>
    .card-list {
      width: 1045px;
      margin-top: 160px;
      margin-left: 16px;
      padding-right: 8px;  
      display: grid;
      position: relative;
      gap: 24px;
      overflow-y: auto;     
      grid-template-columns: repeat(3, 1fr);
    }
  
    .card-list::-webkit-scrollbar {
      display: none;                
    }
  
  </style>
    