<template>
    <div class="login-page">
      <!-- 서비스 로고 -->
      <img src="/marktory_logo.png" alt="서비스 로고" class="logo" />
  
      <!-- 입력 필드: 이메일 -->
      <InputField
        v-model="email"
        placeholder="아이디(이메일)"
        type="email"
      />
  
      <!-- 입력 필드: 비밀번호 -->
      <InputField
        v-model="password"
        placeholder="비밀번호"
        type="password"
      />
  
      <!-- 로그인 버튼 -->
      <LoginButton @click="handleLogin" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import LoginButton from '../components/login/LoginButton.vue'
  import InputField from '../components/login/InputField.vue'
  
  // 상태값 (v-model)
  const email = ref('')
  const password = ref('')
  
  // 로그인 버튼 클릭 시 동작
  const handleLogin = () => {
    console.log('로그인 시도!')
    console.log('이메일:', email.value)
    console.log('비밀번호:', password.value)
    // 여기에 로그인 요청 또는 라우팅 추가 가능!
  }
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 24px;
    padding: 0 16px;
    background-color: #1e1e1e; 
  }
  
  .logo {
    width: 500px;
    height: auto;
    margin-bottom: 32px;
  }
  </style>
  