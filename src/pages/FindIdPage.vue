<template>
  <div class="find-id-page">
    <Header />

    <div class="wrapper">
      <div class="scaler" :style="scaleStyle">
        <div class="findid-container">
          <img src="@/assets/icons/marktory-logo.svg" alt="로고" class="logo" />

          <!-- 이름 입력 -->
          <InputField v-model="name" placeholder="이름" />
          <p v-if="!name && triedSubmit" class="error">필수 항목입니다.</p>

          <!-- 생년월일 입력: BirthDateField 사용 -->
          <BirthDateField v-model="birth" />
          <p v-if="!birth && triedSubmit" class="error">필수 항목입니다.</p>

          <!-- 아이디 찾기 버튼 -->
          <LoginButton text="아이디 찾기" @click="handleFindId" />

          <!-- 하단 링크 -->
          <div class="links">
            <RouterLink to="/signup">회원가입</RouterLink>
            <RouterLink to="/login">로그인</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '../components/AppHeader.vue'
import Footer from '../components/footer/AppFooter.vue'
import InputField from '../components/login/InputField.vue'
import LoginButton from '../components/login/LoginButton.vue'
import BirthDateField from '../components/login/BirthDateField.vue' // ✅ 여기 정확히 import!

const name = ref('')
const birth = ref('')
const triedSubmit = ref(false)

const handleFindId = () => {
  triedSubmit.value = true

  if (!name.value || !birth.value) {
    alert('이름과 생년월일을 모두 입력해 주세요.')
    return
  }

  console.log('아이디 찾기 요청:', name.value, birth.value)
}

// ✅ 화면 확대/축소 방지
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
    zIndex: 10,
  }
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 90vh;
  position: relative;
  background-color: black;
  overflow: hidden;
}

.scaler {
  will-change: transform;
}

.findid-container {
  width: 1920px;
  height: 1080px;
  font-family: 'Noto Sans KR', sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.logo {
  width: 500px;
  margin-bottom: 16px;
}

.error {
  color: #ff5050;
  font-size: 14px;
  margin-top: -12px;
  margin-bottom: 4px;
  width: 500px;
  text-align: left;
}

.links {
  width: 500px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #fd6f22;
}

.links a {
  color: #fd6f22;
  text-decoration: none;
}

.links a:hover {
  color: white;
}
</style>
