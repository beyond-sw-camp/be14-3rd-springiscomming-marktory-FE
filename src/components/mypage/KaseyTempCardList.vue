<template>
    <div class="card-list">
      <PostCard
        v-for="temp in tempList"
        :key="temp.id"
        :title="temp.title"
        :date="temp.date"
        :profileImg="temp.profileImg"
        :thumbnail="temp.thumbnail"
        :usageCount="temp.usageCount"
        :nickname="temp.nickname"
        type="temp"/>
    </div>
  </template>
      
  <script setup>
    import PostCard from './PostCard.vue';
    import { ref, onMounted, defineProps, watch } from 'vue'

    const tempList = ref([])

    const props = defineProps({
      filterType: String  
    })

    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/kaseytemps')
      const data = await res.json()
      tempList.value = props.filterType === 'subscribe'
    ? data.filter(post => post.id % 2 === 0)
    : data
    };

    onMounted(fetchData)

    watch(() => props.filterType, fetchData)
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
      