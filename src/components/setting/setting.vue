<template>
  <div class="settings-container">
    <div class="profile-section">
      <div class="profile-left">
        <div class="profile-image">
          <img src="@/assets/icons/doeun-profile.svg" alt="Profile Image" />
        </div>
        <div class="button-group">
          <button class="upload-button">이미지 업로드</button>
          <button class="remove-button">이미지 제거</button>
        </div>
      </div>
      <div class="profile-right">
        <div class="setting-item">
          <h1 class="user-name">곽우석</h1>
        </div>

        <div class="setting-group">
          <div class="setting-item">
            <div class="section-header">
              <div class="section-title">
                <h2>닉네임</h2>
              </div>
              <div class="nickname-container">
                <span class="status-text">우석짱짱맨</span>
              </div>
              <div class="right-content">
                <span class="edit-tag">수정</span>
              </div>
            </div>
            <p class="description">회원의 개성을 나타내는 닉네임입니다.</p>
          </div>

          <div class="setting-item">
            <div class="section-header">
              <div class="section-title">
                <h2>이메일 주소</h2>
              </div>
              <div class="email-container">
                <a href="mailto:dntjr9999@gmail.com" class="email">dntjr9999@gmail.com</a>
              </div>
            </div>
            <p class="description">회원 인증을 위한 이메일 주소입니다.</p>
          </div>

          <div class="setting-item">
            <div class="section-header">
              <div class="section-title">
                <h2>비밀번호</h2>
              </div>
              <div class="right-content">
                <span class="edit-tag">수정</span>
              </div>
            </div>
            <p class="description">회원 인증을 위한 비밀번호입니다.</p>
          </div>

          <div class="setting-item">
            <div class="section-header">
              <div class="section-title">
                <h2>알림 설정</h2>
              </div>
              <div class="toggle-container">
                <label class="switch">
                  <input type="checkbox" v-model="notificationEnabled">
                  <span class="slider"></span>
                </label>
                <span class="toggle-text">{{ notificationEnabled ? 'on' : 'off' }}</span>
              </div>
              <div class="right-content">
              </div>
            </div>
          </div>
        </div>

        <div class="setting-item withdrawal-section">
          <div class="section-header">
            <div class="section-title">
              <h2>회원 탈퇴</h2>
            </div>
            <div class="right-content">
              <button class="withdrawal-button">회원 탈퇴</button>
            </div>
          </div>
          <p class="description">탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const notificationEnabled = ref(false);
</script>

<style scoped>
.settings-container {
  max-width: 1440px;
  width: 100%;
  margin: 120px auto 80px;
  padding: 0 20px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.profile-section {
  width: 1200px;
  display: flex;
  gap: 80px;
  align-items: flex-start;
}

.profile-left {
  display: flex;
  flex-direction: column;
  gap: 35px;
  flex-shrink: 0;
  align-items: center;
  width: 196px;
}

.profile-right {
  flex-grow: 1;
  max-width: 800px;
}

.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden; 
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 175px;
}

.user-name {
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0 95px 0;
  color: white;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.setting-item {
  margin-bottom: 0;
}

.withdrawal-section {
  margin-top: 80px;
  padding-top: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
  min-height: 28px;
}

.section-title {
  width: 120px;
}

.section-title h2 {
  font-size: 19px;
  margin: 0 0 4px 0;
  color: white;
  font-weight: bold;
  white-space: nowrap;
}

.description {
  color: #666;
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
  font-weight: bold;
}

.withdrawal-section .section-header {
  margin-bottom: 12px;
}

.withdrawal-section .section-title {
  width: auto;
}

.withdrawal-section .description {
  color: #666;
  font-size: 18px;
  margin: 0;
  line-height: 1.5;
  font-weight: bold;
  padding-left: 2px;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  width: 120px;
  justify-content: flex-end;
}

.nickname-container, .email-container, .toggle-container {
  position: absolute;
  left: 400px;
}

.status-text {
  color: #666;
  font-size: 14px;
  display: inline-block;
  font-weight: bold;
}

.email {
  color: #666;
  font-size: 14px;
  display: inline-block;
  text-decoration: underline;
  white-space: nowrap;
  font-weight: bold;
}

.edit-tag {
  color: #FF4B4B;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
}

.upload-button, .remove-button {
  width: 175px;
  height: 41px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 21px;
  font-style: bold;
  width: 100%;
}

.upload-button {
  background: #FD6F22;
  color: white;
}

.remove-button {
  background: #2A2A2A;
  color: white;
}

.switch {
  position: relative;
  display: inline-block;
  width: 85px;
  height: 40px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #868E96;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 29px;
  width: 30px;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #FD6F22;
}

input:checked + .slider:before {
  transform: translate(43px, -50%);
}

.withdrawal-button {
  background: #FF4B4B;
  color: white;
  border: none;
  width: 80px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.withdrawal-description {
  color: #666;
  font-size: 14px;
  margin-left: 16px;
  white-space: nowrap;
}

.toggle-container {
  position: absolute;
  left: 400px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle-text {
  color: #666;
  font-size: 16px;
  font-weight: bold;
}
</style>
