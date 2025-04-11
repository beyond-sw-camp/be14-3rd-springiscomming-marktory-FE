<template>
  <header>

  </header>

  <div>
    <Post :post="postData" />
  </div>
</template>

<script setup>
import Post from '../components/post/Post.vue'

const postData = {
  title: 'BEYOND 14기 365주차 프론트엔드 인공지능, 안드로이드, PHP 주간 회고',
  date: '2025년 2월 25일',
  tags: ['JAVA', 'JPA', '안드로이드', 'PHP', 'IOS', 'AI', 'MSA', '개발자', 'JAR', 'IntelliJ'],
  image: '/image.png', // public 폴더에 넣은 이미지 경로
  content: `이번 SQLD 자격증 시험을 계기로 DB 사용과 설계에 대한 자신감이 붙은 거 같다. 
하지만 시험에는 떨어질 것만 같다. 
같은 날 시험을 본 동기들과 이야기해 봤는데 내 어린짐작으로는 제법 많이 틀린 거 같다 😭 
떨어지면 떨어진 대로 어차피 SQL은 공부할수록 이득이니까 계속 공부해서 다음 기회를 노려봐야겠다.`
}
</script>
