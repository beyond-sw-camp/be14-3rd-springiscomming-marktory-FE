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
      filterType: String,
      sortOption: String
    })

    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/allposts')
      let data = await res.json()

      // 구독 필터 먼저
      if (props.filterType === 'subscribe') {
        data = data.filter(post => post.id % 2 === 0)
      }

      // 좋아요순 정렬 처리 (문자열 → 숫자 변환)
      if (props.sortOption === '좋아요순') {
        data = [...data].sort((a, b) => Number(b.likeCount) - Number(a.likeCount))
      } else if (props.sortOption === '최신순') {
        data = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
      }

      postList.value = data
    }

    onMounted(fetchData)

    watch(
      [() => props.filterType, () => props.sortOption],
      fetchData
    )
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
    