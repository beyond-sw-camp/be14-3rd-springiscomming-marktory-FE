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
      const res = await fetch('http://localhost:3001/templates')
      const data = await res.json()
      tempList.value = props.filterType === 'subscribe'
    ? data.filter(post => post.id % 2 === 0)
    : data
    };

    onMounted(fetchData)

    watch(() => props.filterType, fetchData)
    // import imgage from './D_profile_IMG.png';
      
    // const postList = [
    //   {
    //     title: '템플릿 1',
    //     date: '2024-03-01',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Dong'
    //   },
    //   {
    //     title: '템플릿 2',
    //     date: '2024-03-02',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Jisoo'
    //   },
    //   {
    //     title: '템플릿 3',
    //     date: '2024-03-03',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Ironman'
    //   },
    //   {
    //     title: '템플릿 4',
    //     date: '2024-03-01',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Dong'
    //   },
    //   {
    //     title: '템플릿 5',
    //     date: '2024-03-02',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Jisoo'
    //   },
    //   {
    //     title: '템플릿 6',
    //     date: '2024-03-03',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Ironman'
    //   },
    //   {
    //     title: '템플릿 7',
    //     date: '2024-03-01',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Dong'
    //   },
    //   {
    //     title: '템플릿 8',
    //     date: '2024-03-02',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Jisoo'
    //   },
    //   {
    //     title: '템플릿 9',
    //     date: '2024-03-03',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Ironman'
    //   },
    //   {
    //     title: '템플릿 10',
    //     date: '2024-03-02',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Jisoo'
    //   },
    //   {
    //     title: '템플릿 11',
    //     date: '2024-03-03',
    //     thumbnailImg: imgage,
    //     profileImg: imgage,
    //     nickname: 'Ironman'
    //   }
    // ];
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
      