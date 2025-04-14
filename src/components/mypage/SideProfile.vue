<template>
  <div class="profile-card">
    <img class="profile-img" :src="member.image" alt="프로필 이미지" @error="(e) => console.error('이미지 로드 실패:', e.target.src)" />
    <div class="nickname">{{ member.nickname }}</div>
    <div class="email">{{ member.email }}</div>
    <div class="follow-info">
      <img src="../../assets/icons/follow-icon.svg" />
      <span class="clickable" @click="openOverlay('followers')">
        <strong>{{ member.followerCount }}</strong> followers
      </span>
      ·
      <span class="clickable" @click="openOverlay('following')">
        <strong>{{ member.followingCount }}</strong> following
      </span>
    </div>
    <teleport to="body">
      <FollowUserList
        v-if="showOverlay"
        :title="overlayType"
        :users="overlayUsers"
        @close="showOverlay = false"
      />
    </teleport>
  </div>
</template>

<script setup>
  import FollowUserList from '../follow/FollowUserList.vue';
  import followImg from '@/components/mypage/D_profile_IMG.png';
  import followImg2 from '@/assets/comment/alex_profile.png'
  import { ref, onMounted } from 'vue';

  const member = ref({});

  onMounted(async () => {
    try {
      const res = await fetch('http://localhost:3001/members?id=11');

      if (!res.ok) {
        throw new Error('서버 응답 실패');
      }

      const data = await res.json();
      member.value = data[0];
    } catch (err) {
      console.error('Fetch 실패:', err);
    }
  });

  const showOverlay = ref(false);
  const overlayType = ref('followers');
  const overlayUsers = ref([]);

  const dummyUsers = [
    { id: 1, nickname: 'Kasey', email: 'meow@mail.com', image: followImg },
    { id: 2, nickname: 'Morris', email: 'meow@mail.com', image: followImg2 },
    { id: 3, nickname: 'Dong', email: 'rainyday@mail.com', image: followImg },
    { id: 4, nickname: 'Alex', email: 'woo@mail.com', image: followImg },
    { id: 5, nickname: 'Kasey', email: 'meow@mail.com', image: followImg },
    { id: 6, nickname: 'Morris', email: 'meow@mail.com', image: followImg },
    { id: 7, nickname: 'Dong', email: 'rainyday@mail.com', image: followImg },
    { id: 8, nickname: 'Alex', email: 'woo@mail.com', image: followImg },
    { id: 9, nickname: 'Kasey', email: 'meow@mail.com', image: followImg },
    { id: 10, nickname: 'Morris', email: 'meow@mail.com', image: followImg },
    { id: 11, nickname: 'Dong', email: 'rainyday@mail.com', image: followImg },
    { id: 12, nickname: 'Alex', email: 'woo@mail.com', image: followImg }
  ];

  function openOverlay(type) {
    overlayType.value = type;
    overlayUsers.value = dummyUsers;
    showOverlay.value = true;
  }
</script>

<style scoped>
  .profile-card {
    width: 262px;
    height: 361px;
    margin-top: 404px;
    padding-top: 19px;
    background-color: black;
    text-align: center;
  }

  .profile-img {
    width: 196px;
    height: 196px;
    margin: 0 auto;
    border-radius: 50%;
    object-fit: cover;
  }

  .nickname {
    margin-top: 10px;
    padding: 5px 56px;
    font-size: 32px;
    display: inline-block;
    color: white;
    border-bottom: 2px solid #FD6F22;
  }

  .email {
    padding-top: 10px;
    padding-bottom: 17px;
    font-size: 16px;
    color: white;
  }

  .follow-info {
    font-size: 14px;
    color: white;
  }

  .clickable {
    cursor: pointer;
    text-decoration: underline;
  }
</style>