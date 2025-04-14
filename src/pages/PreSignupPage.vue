<template>

  <AppHeader />

  <div class="wrapper">
    <div class="scaler" :style="scaleStyle">
      <div class="login-container">
        <!-- 왼쪽 -->
        <div class="welcome-section">
          <h1 class="welcome-title">환영해요!</h1>
          <img src="@/assets/icons/marktory-cat.svg" alt="고양이" class="cat-image" />
          <p class="welcome-text">Marktory는 모든 사람의<br />이야기를 기다립니다.</p>
        </div>

        <!-- 오른쪽 -->
        <div class="login-section">
          <img src="@/assets/icons/marktory-logo.svg" alt="로고" class="logo" />
          <InputField v-model="email" placeholder="이메일을 입력하세요" type="email" />
          <LoginButton @click="sendEmail" text="이메일 전송" />
        </div>
      </div>
    </div>
  </div>

  <AppFooter />   
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import InputField from '@/components/login/InputField.vue'
import LoginButton from '@/components/login/LoginButton.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'

const email = ref('')
const scaleStyle = ref({})

const baseWidth = 1920
const baseHeight = 1080

const updateScale = () => {
  const scaleX = window.innerWidth / baseWidth
  const scaleY = window.innerHeight / baseHeight
  const scale = Math.min(scaleX, scaleY)
  const offsetX = (window.innerWidth - baseWidth * scale) / 2
  const offsetY = (window.innerHeight - baseHeight * scale) / 2 - 60

  scaleStyle.value = {
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
    transformOrigin: 'top left',
    position: 'absolute',
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
    top: 0,
    left: 0,
  }
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})

const sendEmail = async () => {
  if (!email.value) {
    alert('이메일을 입력해주세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8000/member-server/regist/api/member/signup-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: email.value }),
    });

    const data = await response.json(); // ✅ JSON 형태로 받기

    if (response.status !== 201) {
      alert(`이메일 전송 실패: ${data.exceptionMessage}`);
      return;
    }

    alert(data.message); // 예: "이메일이 전송되었습니다."
  } catch (err) {
    console.error('요청 중 오류 발생:', err);
    alert('서버와의 통신 중 문제가 발생했습니다.');
  }
};

</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 80vh;
  background-color: #000;
  overflow: hidden;
  position: relative;
}

.scaler {
  will-change: transform;
}

.login-container {
  display: flex;
  width: 1920px;
  height: 1080px;
  font-family: "Noto Sans KR", sans-serif;
  color: white;
}

/* 왼쪽 */
.welcome-section {
  margin-top: -50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px;
  box-sizing: border-box;
}

.welcome-title {
  font-size: 40px;
  font-weight: bold;
}

.cat-image {
  width: 260px;
  height: auto;
}

.welcome-text {
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  line-height: 1.4;
}

/* 오른쪽 */
.login-section {
  margin-top: -50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px;
}

.logo {
  width: 500px;
  margin-bottom: 16px;
}
</style>
