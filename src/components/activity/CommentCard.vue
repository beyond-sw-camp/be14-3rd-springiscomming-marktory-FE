<template>
    <div class="comment-card">
      <p class="date">{{ date }}</p>
      <p class="content">{{ content }}</p>
      <div class="meta">
        <img :src="profileImg" alt="profile" class="profile-img" />
        <span class="post-title">{{ postTitle }}</span>
      </div>
    </div>
</template>
  
<script setup>
  const props = defineProps({
    date: String,
    content: String,
    postTitle: String,
    profileImg: String
  });
</script>
  
<style scoped>
  .comment-card {
    width: 803px;
    height: 118px;
    background-color: #2b2b2b;
    border-radius: 20px;
    color: white;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .date {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .content {
    font-size: 20px;
    line-height: 1.4;
    flex-grow: 1;
    margin-bottom: 8px;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  .profile-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
  }

  .post-title {
    font-size: 14px;
  }

  .comment-card:hover {
    background-color: #6d6d6d;
  }
</style>
