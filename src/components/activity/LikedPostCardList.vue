<template>
  <div class="card-list">
    <PostCard
    v-for="post in postList"
    :key="post.id"
    :title="post.title"
    :date="post.date"
    :profileImg="post.profileImg"
    :thumbnail="post.thumbnail"
    :commentCount="post.commentCount"
    :likeCount="post.likeCount"
    :nickname="post.nickname"
    type="post"/>
  </div>
</template>
    
<script setup>
  import PostCard from '../mypage/PostCard.vue';
  import { ref, onMounted } from 'vue'

  const postList = ref([])

  onMounted(async () => {
    const res = await fetch('http://localhost:3001/likedposts')
    const data = await res.json()
    postList.value = data
  });
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
    