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
          <InputField v-model="email" placeholder="아이디(이메일)" type="text" />
          <InputField v-model="password" placeholder="비밀번호" type="password" />
          <LoginButton @click="handleLogin" />
          <div class="login-links">
            <router-link to="/presignup">회원가입</router-link>
            <span class="find-links">
              <router-link to="/findid">아이디</router-link>
              /
              <router-link to="/prefindpw">비밀번호</router-link>
              찾기
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <AppFooter /> 
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useMemberStore } from '../stores/memberStore'
import { useRouter } from 'vue-router'
import InputField from '@/components/login/InputField.vue'
import LoginButton from '@/components/login/LoginButton.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'

/* 복호화 */
import bcrypt from 'bcryptjs'

/* pinia를 불러오기 */
const memberStore = useMemberStore();

/* 라우터 사용 */
const router = useRouter();

// 로그인 처리 함수
const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('이메일과 비밀번호를 입력해주세요.')
    return
  }

  try {
    const res = await fetch(`http://localhost:3000/members?email=${encodeURIComponent(email.value)}`)
    const members = await res.json()

    if (members.length === 0) {
      alert('존재하지 않는 이메일입니다.')
      return
    }

    const member = members[0]
    const isMatch = await bcrypt.compare(password.value, member.password)

    if (isMatch) {
      memberStore.login(member)
      alert('✅ 로그인 성공!')
      router.push('/')
    } else {
      alert('❌ 비밀번호가 일치하지 않습니다.')
    }
  } catch (err) {
    console.error('로그인 중 오류 발생:', err)
    alert('로그인 중 오류가 발생했습니다.')
  }
}

const email = ref('')
const password = ref('')
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

// const handleLogin = () => {
//   console.log('로그인 시도:', email.value, password.value)
// }
</script>

<style>
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
  margin-top: 50px;
  display: flex;
  width: 1920px;
  height: 1080px;
  font-family: "Noto Sans KR", sans-serif;
  color: white;
}

/* 왼쪽 */
.welcome-section {
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

.login-links {
  width: 500px;
  font-size: 23px;
  display: flex;
  justify-content: space-between;
  font-family: "Noto Sans KR", sans-serif;
  color: #fd6f22;
}

.login-links a {
  color: #fd6f22;
  text-decoration: none;
}

.find-links a {
  margin: 0 2px;
}

.login-links a:hover,
.find-links a:hover {
  color: white;
}
</style>
