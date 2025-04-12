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
        title: '템플릿 1',
        date: '2024-03-01',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Dong'
      },
      {
        title: '템플릿 2',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '템플릿 3',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      },
      {
        title: '템플릿 4',
        date: '2024-03-01',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Dong'
      },
      {
        title: '템플릿 5',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '템플릿 6',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      },
      {
        title: '템플릿 7',
        date: '2024-03-01',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Dong'
      },
      {
        title: '템플릿 8',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '템플릿 9',
        date: '2024-03-03',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Ironman'
      },
      {
        title: '템플릿 10',
        date: '2024-03-02',
        thumbnailImg: imgage,
        profileImg: imgage,
        nickname: 'Jisoo'
      },
      {
        title: '템플릿 11',
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
      margin-left: 16px;
      margin-top: 160px;
      padding-right: 8px;  
      gap: 24px;
      display: grid;
      position: relative;
      overflow-y: auto;
      grid-template-columns: repeat(3, 1fr);
    }
    
    .card-list::-webkit-scrollbar {
      display: none; 
    }
    
  </style>
      