<template>
  <div class="find-pre-pw-page">
    <AppHeader />

    <div class="wrapper">
      <div class="scaler" :style="scaleStyle">
        <div class="findpw-container">
          <img src="@/assets/icons/marktory-logo.svg" alt="로고" class="logo" />

          <h1>비밀번호 찾기</h1>
          <h3>이메일 인증 전 본인 인증이 필요합니다.</h3>

          <!-- 이름 입력 -->
          <InputField v-model="name" placeholder="이름" />
          <p v-if="!name && triedSubmit" class="error">필수 항목입니다.</p>

          <!-- 생년월일 입력 -->
          <BirthDateField v-model="birth" />
          <p v-if="!birth && triedSubmit" class="error">필수 항목입니다.</p>

          <!-- 인증 버튼 -->
          <LoginButton text="본인 인증" @click="handleFindId" />

          <!-- 하단 링크 -->
          <div class="links">
            <RouterLink to="/presignup">회원가입</RouterLink>
            <RouterLink to="/login">로그인</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'
import InputField from '@/components/login/InputField.vue'
import LoginButton from '@/components/login/LoginButton.vue'
import BirthDateField from '@/components/login/BirthDateField.vue'

const router = useRouter()

const name = ref('')
const birth = ref('')
const triedSubmit = ref(false)

const formatBirthToISO = (birthInput) => {
  if (birthInput instanceof Date && !isNaN(birthInput)) {
    const year = birthInput.getFullYear()
    const month = String(birthInput.getMonth() + 1).padStart(2, '0')
    const day = String(birthInput.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return ''
}

const handleFindId = async () => {
  triedSubmit.value = true

  if (!name.value || !birth.value) {
    alert('이름과 생년월일을 모두 입력해 주세요.')
    return
  }

  const formattedBirth = formatBirthToISO(birth.value)
  if (!formattedBirth) {
    alert('올바른 생년월일 형식이 아닙니다.')
    return
  }

  try {
    const res = await fetch(
      `http://localhost:3000/members?name=${encodeURIComponent(name.value)}&birthday=${encodeURIComponent(formattedBirth)}`
    )
    const members = await res.json()

    if (members.length === 0) {
      alert('일치하는 사용자를 찾을 수 없습니다.')
      return
    }

    const memberId = members[0].id

    // memberId만 저장
    sessionStorage.setItem('FindPw', JSON.stringify({ memberId }))
    console.log(memberId)
    // 페이지 이동
    router.push('/findpw')
  } catch (err) {
    console.error('비밀번호 본인 인증 중 오류 발생:', err)
    alert('본인 인증 오류.')
  }
}

// 화면 확대/축소 방지
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
  height: 80vh;
  position: relative;
  background-color: black;
  overflow: hidden;
}

.scaler {
  will-change: transform;
}

.findpw-container {
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
  margin-top: -50px;
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
  font-size: 23px;
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
