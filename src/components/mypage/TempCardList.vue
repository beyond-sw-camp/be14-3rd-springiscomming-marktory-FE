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
    filterType: String,
    sortOption: String  
  })

  const fetchData = async () => {
    const res = await fetch('http://localhost:3001/alltemplates')
    let data = await res.json()

    // 구독 필터
    if (props.filterType === 'subscribe') {
      data = data.filter(post => post.id % 2 === 0)
    }

    // 정렬 처리
    if (props.sortOption === '사용순') {
      data = [...data].sort((a, b) => Number(b.usageCount) - Number(a.usageCount))
    } else if (props.sortOption === '최신순') {
      data = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    tempList.value = data
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
      