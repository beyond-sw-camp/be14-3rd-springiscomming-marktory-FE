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
    import PostCard from './PostCard.vue';
    import { ref, onMounted, defineProps, watch } from 'vue'

    const postList = ref([])

    const props = defineProps({
      filterType: String  
    })

    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/kaseyposts')
      const data = await res.json()
      postList.value = props.filterType === 'subscribe'
    ? data.filter(post => post.id % 2 === 0)
    : data
    };

    onMounted(fetchData)

    watch(() => props.filterType, fetchData)
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
    