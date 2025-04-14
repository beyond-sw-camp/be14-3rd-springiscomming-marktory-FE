<template>
  <div class="result-wrapper">
    <AppHeader />

    <div class="wrapper">
      <div class="scaler" :style="scaleStyle">
        <div class="result-page">
          <img src="@/assets/icons/marktory-logo.svg" alt="로고" class="logo" />

          <h1 class="title">아이디 찾기</h1>
          <p class="count">검색된 아이디는 총 {{ emailList.length }}개 입니다.</p>

          <div class="scroll-area">
            <div
              v-for="(email, index) in emailList"
              :key="index"
              class="email-box"
            >
              {{ maskEmail(email) }}
            </div>
          </div>

          <div class="fixed-footer">
            <LoginButton text="로그인" @click="goToLogin" />
            <div class="links">
              <RouterLink to="/signup">회원가입</RouterLink>
              <RouterLink to="/prefindpw">비밀번호 찾기</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

  
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'
import LoginButton from '@/components/login/LoginButton.vue'

const route = useRoute()
const router = useRouter()
const emailList = ref([])

const goToLogin = () => {
  router.push('/login')
}

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
  const saved = sessionStorage.getItem('findIdResult')
	// 로그아웃, 경로 아웃시 sessionStorage.clear() 활용
  if (!saved) {
    alert('잘못된 접근입니다.')
    router.replace('/findid')
    return
  }

  try {
    emailList.value = JSON.parse(saved)
  } catch (err) {
    console.error('저장된 이메일 파싱 실패', err)
    router.replace('/findid')
  }

  updateScale()
  window.addEventListener('resize', updateScale)
})


onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale)
})

const maskEmail = (email) => {
  const [id, domain] = email.split('@')
  const maskedId = id.slice(0, 2) + '****'
  return `${maskedId}@${domain}`
}
</script>


  
<style scoped>
.wrapper {
  width: 100vw;
  height: 80vh;
  position: relative;
  background-color: black;
  overflow: hidden;
}
.scaler {
  will-change: transform;
}

.result-page {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
	justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
  overflow: hidden;
}

.logo {
  width: 500px;
  margin-bottom: 24px;
  margin-top: 50px;
}

.title {
  font-size: 32px;
  font-weight: bold;
}

.count {
  margin: 20px 0;
  color: #fd6f22;
	font-size: 23px;
}

.scroll-area {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.email-box {
  border: 2px solid white;
  padding: 20px;
  width: 500px;
	height: 80px;
  font-size: 23px;
}

.fixed-footer {
  text-align: center;
}

.links {
	margin-top: 20px;
  display: flex;
  gap: 24px;
  font-size: 23px;
	justify-content: space-between;
}

.links a {
  color: #fd6f22;
  text-decoration: none;
}
.links a:hover {
  color: white;
}
</style>
