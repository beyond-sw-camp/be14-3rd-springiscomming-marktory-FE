<template>
    <div class="login-container">
      <!-- 왼쪽 인사 영역 -->
      <div class="welcome-section">
        <h1 class="welcome-title">환영해요 !</h1>
            <img src="/marktory_cat.png" alt="마크토리 고양이이" class="cat-image" />
        <p class="welcome-text">
          Marktory는 모든 사람들의 <br />
          이야기를 기다립니다.
        </p>
      </div>
  
      <!-- 오른쪽 로그인 영역 -->
      <div class="login-section">
        <!-- 로고 -->
        <img src="/marktory_logo.png" alt="서비스 로고" class="logo" />
  
        <!-- 이메일 입력 -->
        <InputField
          v-model="email"
          placeholder="아이디(이메일)"
          type="email"
        />
  
        <!-- 비밀번호 입력 -->
        <InputField
          v-model="password"
          placeholder="비밀번호"
          type="password"
        />
  
        <!-- 로그인 버튼 -->
        <LoginButton @click="handleLogin" />
  
        <!-- 하단 링크 -->
        <!-- 로그인 아래 링크 -->
        <div class="login-links">
            <a href="/signup">회원가입</a>
            <span class="find-links">
                <a href="/find-id">아이디</a> /
                <a href="/find-password">비밀번호</a> 찾기
            </span>
        </div>
        </div>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import InputField from '../components/login/InputField.vue'
  import LoginButton from '../components/login/LoginButton.vue'
  
  const email = ref('')
  const password = ref('')
  
  const handleLogin = () => {
    console.log('로그인 시도!')
    console.log('이메일:', email.value)
    console.log('비밀번호:', password.value)
  }
  </script>
  
  <style scoped>
  /* 전체 컨테이너 */
  .login-container {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    background-color: #000;
    color: #fff;
  }
  
  /* 왼쪽 인사 영역 */
  .welcome-section {
    flex: 1 1 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    gap: 20px;
    text-align: center;
  }
  
  .welcome-title {
    font-size: 40px;
    font-weight: bold;
    font-family: "Noto Sans KR", sans-serif;

  }
  
  .cat-image {
    width: 260px;
    height: auto;
  }
  
  .welcome-text {
    font-size: 40px;
    line-height: 1.6;
    font-weight: bold;
    font-family: "Noto Sans KR", sans-serif;
  }
  
  /* 오른쪽 로그인 영역 */
  .login-section {
    flex: 1 1 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
    gap: 24px;
  }
  
  .logo {
    max-width: 100%;
    width: 500px;
    height: auto;
    margin-bottom: 32px;
  }
  
  /* 하단 링크 */
  .login-links {
  display: flex;
  justify-content: space-between; /* 좌우로 정렬 */
  align-items: center;
  width: 500px; /* 버튼 너비 기준 */
  font-size: 20px;
  margin-top: 10px;
  font-family: "Noto Sans KR", sans-serif;
  color: #fd6f22;
}
  
  .login-links a {
    color: #fd6f22;
    text-decoration: none;
  }
  
  /* 아이디 / 비밀번호 찾기 부분 따로 스타일 */
.find-links a {
  margin: 0 2px;
  font-family: "Noto Sans KR", sans-serif;

}

.sign-links:hover,.find-links a:hover {
  color: #ffffff; /* 호버 시 흰색으로 변경 */
}


  /* 반응형 처리 */
  @media (max-width: 900px) {
    .login-container {
      flex-direction: column;
    }
  
    .welcome-section,
    .login-section {
      width: 100%;
    }
  }
  </style>
  