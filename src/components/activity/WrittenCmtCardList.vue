<template>
  <div class="comment-list">
    <CommentCard
      v-for="comment in commentList"
      :key="comment.id"
      :date="comment.date"
      :content="comment.content"
      :post-title="comment.postTitle"
      :profile-img="comment.profileImg"
    />
  </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import CommentCard from './CommentCard.vue';

  const commentList = ref([]);

  onMounted(async () => {
    const res = await fetch('http://localhost:3001/writtencomment');
    const data = await res.json();
    commentList.value = data;
  });
</script>
  
<style scoped>
  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
  