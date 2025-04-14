<template>
    <div class="modal-overlay">
      <div class="modal-container">
        <h2 class="modal-title">회원 탈퇴를 위해<br />이메일과 비밀번호를 입력해주세요.</h2>
        <form @submit.prevent="handleSubmit">
          <input
            type="email"
            v-model="email"
            class="modal-input"
            placeholder="이메일"
            required
          />
          <p v-if="emailError" class="error-text">{{ emailError }}</p>
          <input
            type="password"
            v-model="password"
            class="modal-input"
            placeholder="비밀번호"
            required
          />
          <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
          <div class="modal-actions">
            <button type="button" class="cancel-button" @click="closeModal">취소</button>
            <button type="submit" class="confirm-button">확인</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import bcrypt from 'bcryptjs';
  
  const email = ref(''); // 이메일 입력값
  const password = ref(''); // 비밀번호 입력값
  const emailError = ref('');
  const passwordError = ref('');
  const emit = defineEmits(['close', 'confirm']);
  
  // 모달 닫기
  const closeModal = () => {
    emit('close'); // 부모 컴포넌트에 모달 닫기 이벤트 전달
  };
  
  
  // 폼 제출 처리
  const handleSubmit = async() => {

    emailError.value = '';
    passwordError.value = '';

    if (!email.value || !password.value) {
      if (!email.value) emailError.value = '이메일을 입력해주세요.';
      if (!password.value) passwordError.value = '비밀번호를 입력해주세요.';
      return;
    }

    try {  
      const res = await fetch(`http://localhost:3001/members?email=${email.value}`);
      const users = await res.json();
      const user = users[0];

      if (!user) {
      emailError.value = '존재하지 않는 이메일입니다.';
      return;
      }

      // 2. bcrypt로 비밀번호 비교
      const isMatch = await bcrypt.compare(password.value, user.password);
      if (!isMatch) {
        passwordError.value = '비밀번호가 일치하지 않습니다.';
        return;
      }

      // 모든 정합성 통과 → 다음 모달 호출
      emit('confirm', user.id); // 아이디도 넘기면 나중에 유용
    } catch (err) {
      console.error('에러 발생:', err);
      alert('서버 오류가 발생했습니다.');
    }
    // console.log('이메일:', email.value);
    // console.log('비밀번호:', password.value);
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  /* 모달 컨테이너 */
  .modal-container {
    background: #3a3a3a;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* 모달 제목 */
  .modal-title {
    color: white;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
    line-height: 1.5;
  }
  
  /* 입력 필드 */
  .modal-input {
    width: 100%;
    height: 40px;
    margin-bottom: 16px;
    padding: 0 12px;
    border: 1px solid #555;
    border-radius: 8px;
    background: #000;
    color: white;
    font-size: 14px;
    outline: none;
  }
  
  /* 입력 필드 포커스 */
  .modal-input:focus {
    border-color: #fd6f22;
  }
  
  /* 버튼 컨테이너 */
  .modal-actions {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  
  /* 취소 버튼 */
  .cancel-button {
    background: #b3b3b3;
    color: black;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
  }
  
  /* 확인 버튼 */
  .confirm-button {
    background: #fd6f22;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
  }
  
  /* 버튼 호버 효과 */
  .cancel-button:hover {
    background: #a1a1a1;
  }
  
  .confirm-button:hover {
    background: #e65c00;
  }
  .error-text {
  color: #ff5f5f;
  font-size: 12px;
  margin-top: -12px;
  margin-bottom: 12px;
  text-align: left;
  padding-left: 4px;
}

  </style>