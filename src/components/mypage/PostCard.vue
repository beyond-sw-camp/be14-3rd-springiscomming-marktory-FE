<template>
    <div class="PostCard">
      <img class="thumbnailImg" :src="props.thumbnailImg" alt="썸네일"/>
      <div class="titleRow">
        <div class="title">{{ props.title }}</div>
        <div class="date">{{ props.date }}</div>
      </div>
      <div class="profileRow">
        <img class="profileImg" :src="props.profileImg" alt="프로필이미지지"/>
        <div class="nickname">{{ props.nickname }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { defineProps } from 'vue';
  
    const props = defineProps({
      thumbnailImg: String,
      title: String,
      date: String,
      profileImg: String,
      nickname: String
    });
  </script>
  
  <style scoped>
    .PostCard {
      width: 329px;
      height: 259px;
      border-radius: 20px;
      background-color: #424242;
      color: white;
    }
  
    .thumbnailImg {
      width: 329px;
      height: 177px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      object-fit: cover;
    }
  
    .titleRow {
      display: flex;
    }
  
    .title {
      max-width: 200px;
      margin-left: 16px;
      margin-top: 5px;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  
    .date {
      margin-left: auto;
      margin-right: 6px;
      margin-top: 13px;
      font-size: 10px;
    }
  
    .profileRow {
      display: flex;
    }
  
    .profileImg {
      width: 29px;
      height: 29px;
      margin-left: 17px;
      margin-top: 11px;
      border-radius: 50%;
    }
  
    .nickname {
      margin-left: 6px;
      margin-top: 19px;
      font-size: 10px;
    }
  
    .PostCard:hover {
      background-color: #6d6d6d;
    }
  </style>
  