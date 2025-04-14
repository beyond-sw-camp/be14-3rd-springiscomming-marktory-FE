<template>

  <AppHeader />

  <div class="wrapper">
    <div class="scaler" :style="scaleStyle">
      <div class="signup-container">
        <!-- 왼쪽 인사말 영역 -->
        <div class="welcome-section">
          <h1 class="welcome-title">환영해요!</h1>
          <img src="../assets/icons/marktory-cat.svg" alt="고양이" class="cat-image" />
          <p class="welcome-text">
            Marktory는 모든 사람의<br />이야기를 기다립니다.
          </p>
        </div>

        <!-- 오른쪽 입력 영역 -->
        <div class="form-section">
          <img src="@/assets/icons/marktory-logo.svg" alt="로고" class="logo" />

          <InputField v-model="name" placeholder="이름" />
          <p v-if="!name && triedSubmit" class="error">필수 항목입니다.</p>

          <InputField v-model="nickname" placeholder="닉네임" />
          <p v-if="!nickname && triedSubmit" class="error">필수 항목입니다.</p>

          <InputField v-model="password" placeholder="비밀번호" type="password" />
          <p v-if="password && !validPassword" class="error">
            8~16자 영문 대소문자, 숫자, 특수문자를 사용하세요.
          </p>

          <InputField v-model="confirmPassword" placeholder="비밀번호 확인" type="password" />
          <p v-if="confirmPassword && !passwordsMatch" class="error">비밀번호가 일치하지 않습니다.</p>

          <!-- 생년월일 입력 -->
          <BirthDateField v-model="birth" />

          <div class="checkbox" :class="{ agreed: agree }" @click="showModal = true">
            <div class="checkbox-custom" :class="{ checked: agree }"></div>
            <span class="agree-text">개인정보 이용약관 동의</span>
          </div>

          <LoginButton text="회원가입" @click="handleSignup" />
        </div>
      </div>
    </div>
  </div>

  <AppFooter />   

	<BaseModal v-if="showModal" title="운영정책" @close="showModal = false">
		<!-- 약관 내용 -->
      <h3>1. 마크토리 서비스</h3>
      <ul>
        <li>마크토리는 나와 내 콘텐츠를 표현하는 공간입니다.</li>
				<li>마크토리는 자신의 게시글과 마크다운 문법을 이용한 템플릿을 통해 자신에 대한 소개와 자신의 콘텐츠를 자유자재로 선보일 수 있습니다. </li>
        <li>마크토리는 커뮤니티에서의 에티켓을 준수합니다.</li>
        <li>이용자의 기본 권리를 우선시합니다.</li>
      </ul>

      <h3>2. 이용 제한 사유에 금지되는 해당 활동</h3>
      <ul>
        <li>다른 이용자에게 욕설, 비하, 혐오 발언, 협박 등 불쾌감을 주는 메시지를 전송하는 행위</li>
        <li>반복적이거나 무분별한 메시지 발송(스팸)으로 타인의 서비스 이용을 방해하는 행위</li>
        <li>타인의 개인정보(이름, 연락처, 주소 등)를 동의 없이 유포하거나 요청하는 행위</li>
      </ul>

      <h3>3. 이용 제한 조치</h3>
      <ul>
        <li>조치할 수 있고 회원의 서비스 이용을 일시적 또는 영구적으로 제한하거나 일방적으로 본 계약을 해지할 수 있습니다.</li>
        <li> 본 운영정책 2.에서 열거한 행위에 구체적으로 해당하지 않는 사항이라하더라도 건전한 서비스 환경 제공에 악영향을 끼치는 경우는 이용이 제한될 수 있으며, 위반되는 활동이 반복되는 경우 가중 처리될 수 있습니다.</li>
      </ul>
      <!-- 커스텀 액션 버튼 슬롯 -->
			<template #action-buttons>
				<button @click="showModal = false" class="cancel-btn">취소</button>
				<button @click="agree = true; showModal = false" class="agree-btn">확인</button>
			</template>
	</BaseModal>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import InputField from '@/components/login/InputField.vue'
import LoginButton from '@/components/login/LoginButton.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'
import BirthDateField from '@/components/login/BirthDateField.vue'
import BaseModal from '@/components/BaseModal.vue'
import bcrypt from 'bcryptjs'

const name = ref('')
const nickname = ref('')
const password = ref('')
const confirmPassword = ref('')
const birth = ref('')
const agree = ref(false)
const showModal = ref(false)
const triedSubmit = ref(false)

const route = useRoute();
const router = useRouter();
const verifiedEmail = ref('');

const validPassword = computed(() =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/.test(password.value)
)
const passwordsMatch = computed(() => password.value === confirmPassword.value)

const handleSignup = async () => {
  triedSubmit.value = true

  const validations = [
    { condition: !name.value, message: '이름을 입력해주세요.' },
    { condition: !nickname.value, message: '닉네임을 입력해주세요.' },
    { condition: !password.value, message: '비밀번호를 입력해주세요.' },
    { condition: !confirmPassword.value, message: '비밀번호를 확인해주세요.' },
    { condition: !agree.value, message: '개인정보 이용약관에 동의해주세요.' },
    { condition: !birth.value, message: '생년월일을 입력해주세요.' },
    { condition: !validPassword.value || !passwordsMatch.value, message: '비밀번호 조건을 확인해주세요.' },
  ]

  for (const { condition, message } of validations) {
    if (condition) {
      alert(message)
      return
    }
  }

  const salt = bcrypt.genSaltSync(12); // 12단계 보안
  const hashedPassword = bcrypt.hashSync(password.value, salt); // 🔐 여기서 해싱
  // 목업 데이터 연결
  const formattedBirthday = new Date(birth.value).toISOString().split("T")[0]; // "YYYY-MM-DD"만 추출
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  try {
    const response = await fetch('http://localhost:3001/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: verifiedEmail.value,
        password: hashedPassword, // 🔐 해시된 비밀번호
        name: name.value,
        nickname: nickname.value,
        birthday: formattedBirthday,
        image: null,
        status: 'is_active',
        black_date: null,
        assigned_date: now,
        delete_date: null,
        report_count: 0,
        is_terms: agree.value,
        role: 'member'
      })
    });

    if (!response.ok) throw new Error('회원가입 실패');

    const result = await response.json();
    console.log('회원가입 성공:', result);
    alert('🎉 회원가입 완료!');

    // ✅ 인증 관련 로컬 스토리지 삭제
    localStorage.removeItem('isEmailVerified')
    localStorage.removeItem('verifiedEmail')
    router.push('/login');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

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
    width: `${baseWidth}px`,
    height: `${baseHeight}px`,
    position: 'absolute',
    top: 0,
    left: 0,
		zIndex: 10,
  }
}

onMounted( async () => {
  updateScale()
  window.addEventListener('resize', updateScale)

  const isEmailVerified = localStorage.getItem('isEmailVerified') === 'true'

  if (isEmailVerified) {
    verifiedEmail.value = localStorage.getItem('verifiedEmail') || ''
    return
  }


  const email = route.query.email;
  const token = route.query.token;

  try {
    const res = await fetch('http://localhost:8000/member-server/regist/api/member/signup-email/verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email,token })
    })

    const data = await res.json()

    if (res.status == 410) {
      alert(data.exceptionMessage)
      router.push('/presignup')
      return
    }
    if (!res.ok) {
      alert(data.exceptionMessage)
      router.push('/')
      return
    }

    // ✅ 인증 성공 시 상태 + localStorage 저장
    verifiedEmail.value = email
    localStorage.setItem('isEmailVerified', 'true')
    localStorage.setItem('verifiedEmail', email)

    // ✅ 쿼리스트링 제거한 URL로 교체 (뒤로가기 누르면 이 URL만 보임)
    router.replace({ path: '/signup' });
    alert(data.verifyMessage);
  } catch (err) {
    alert(err.message);
    router.push('/presignup');
  }
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
}
.signup-container {
  display: flex;
  width: 1920px;
  height: 1080px;
  font-family: 'Noto Sans KR', sans-serif;
  color: white;
}
.welcome-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 40px;
  margin-top: 50px;
}
.cat-image {
  width: 260px;
}
.welcome-title {
  font-size: 40px;
  font-weight: bold;
}
.welcome-text {
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  line-height: 1.4;
}
.form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 40px;
  margin-top: 80px;
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
}
.checkbox {
  width: 500px;
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 12px;
  margin: 8px 0;
  color: white;
  cursor: pointer;
}
.checkbox.agreed {
  color: #fd6f22;
}
.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.checkbox-custom.checked {
  background-color: #fd6f22;
  border-color: #fd6f22;
}
.agree-text {
  cursor: pointer;
  text-decoration: underline;
}

.cancel-btn {
  padding: 10px 24px;
  background: #444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
	width: 83px;
	height: 33px;

	display: flex;
  justify-content: center;
  align-items: center;
}

.agree-btn {
  padding: 10px 24px;
  background: #fd6f22;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
	width: 83px;
	height: 33px;

	display: flex;
  justify-content: center;
  align-items: center;
}

.agree-btn:hover {
  background-color: white;
  color: #fd6f22;
  /* border: 1px solid #fd6f22; */
}
.cancel-btn:hover {
  background-color: #BDBDBD;

  /* border: 1px solid #fd6f22; */
}
</style>
