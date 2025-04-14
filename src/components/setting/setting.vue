<template>
  <div v-if="isVisible" class="settings-container">
    <div class="profile-section">
      <div class="profile-left">
        <div class="profile-image">
          <!-- <img :src="profileImage" alt="Profile Image" /> -->
          <img src="@/assets/icons/doeun-profile.svg" alt="Profile Image" />
        </div>
        <div class="button-group">
          <button class="upload-button" @click="triggerFileSelect">이미지 업로드</button>

          <input
  ref="fileInput"
  type="file"
  accept="image/*"
  @change="handleImageUpload"
  style="display: none"
/>
          <button class="remove-button" @click="openImageDeleteModal">이미지 제거</button>
        </div>
      </div>
      <div class="profile-right">
        <div class="setting-item">
          <h1 class="user-name">곽우석</h1>
        </div>

        <div class="setting-group">
          <div class="setting-item">
            <div class="section-header nickname-header">
              <div class="section-title">
                <h2>닉네임</h2>
              </div>
              <div class="nickname-container">
      <span v-if="!isEditingNickname" class="nickname-container">{{ nickname }}</span>
      <input
        v-else
        type="text"
        v-model="nickname"
        class="nickname-input"
        placeholder="닉네임을 입력하세요"
      />
    </div>

    <div class="right-content">
      <span v-if="!isEditingNickname" class="edit-tag" @click="isEditingNickname = true">수정</span>
      <button v-else class="save-button" @click="isEditingNickname = false">저장</button>
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
                <span
                  v-if="!isEditingPassword"
                  class="edit-tag"
                  @click="isEditingPassword = true"
                >
                  수정
                </span>
              </div>
            </div>

            <div v-if="isEditingPassword" class="password-edit-container">
              <input
                type="password"
                class="password-input"
                placeholder="현재 비밀번호를 입력해주세요"
              />
              <input
                type="password"
                class="password-input"
                placeholder="새 비밀번호를 입력해주세요"
              />
              <input
                type="password"
                class="password-input"
                placeholder="새 비밀번호를 확인해주세요"
              />
              <div class="password-actions">
                <button class="cancel-button" @click="isEditingPassword = false">취소</button>
                <button class="save-button" @click="isEditingPassword = false">저장</button>
              </div>
            </div>
            <p v-else class="description">회원 인증을 위한 비밀번호입니다.</p>
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
              <button class="withdrawal-button" @click="openWithdrawalModal">회원 탈퇴</button>
            </div>
          </div>
          <p class="description">탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
        </div>
      </div>
    </div>


  <!-- 회원 탈퇴 입력 모달 -->
  <WithdrawalInput
      v-if="isWithdrawalInputVisible"
      @close="closeAllModals"
      @confirm="openConfirmWithdrawal"
    />

    <ConfirmWithdrawal
      v-if="isConfirmWithdrawalVisible"
      @close="closeAllModals"
      @confirm="openWithdrawalEnd"
    />

    <WithdrawalEnd
      v-if="isWithdrawalEndVisible"
      @close="closeAllModals"
      @confirm="closeAllModals"
      />

    <ImageDelete
      v-if="isImageDeleteVisible"
      @close="closeImageDeleteModal"
      @confirm="handleImageDelete"

    />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import WithdrawalInput from '@/components/setting/WithdrawalInput.vue';
import ConfirmWithdrawal from '@/components/setting/ConfirmWithdrawal.vue';
import WithdrawalEnd from '@/components/setting/WithdrawalEnd.vue';
import ImageDelete from '@/components/setting/ImageDelete.vue';

const isWithdrawalInputVisible = ref(false);
const isConfirmWithdrawalVisible = ref(false);
const isWithdrawalEndVisible = ref(false);
const isImageDeleteVisible = ref(false);

const closeAllModals = () => {
  isWithdrawalEndVisible.value = false;
  isConfirmWithdrawalVisible.value = false;
  isWithdrawalInputVisible.value = false;
};

const openWithdrawalModal = () => {
  isWithdrawalInputVisible.value = true;
};
const openConfirmWithdrawal = () => {
  isConfirmWithdrawalVisible.value = true;
};

const openWithdrawalEnd = () => {
  console.log('탈퇴버튼 눌리나나');
  isWithdrawalEndVisible.value = true;
};

// 모달 열기
const openImageDeleteModal = () => {
  isImageDeleteVisible.value = true;
};

// 모달 닫기
const closeImageDeleteModal = () => {
  isImageDeleteVisible.value = false;
};



const notificationEnabled = ref(false);
const isEditingNickname = ref(false);
const nickname = ref('우석짱짱맨');

const isEditingPassword = ref(false);
const isVisible = ref(true); // 로컬 창 표시 여부

const profileImage = ref('@/assets/icons/doeun-profile.svg'); // 현재 프로필 이미지 경로
const defaultImage = '@/assets/icons/default-profile.svg';     // 기본 이미지 경로

const handleImageDelete = () => {
  profileImage.value = defaultImage; // 이미지 초기화
  isImageDeleteVisible.value = false; // 모달 닫기
};

const fileInput = ref(null);

// 버튼 눌렀을 때 input 클릭 트리거
const triggerFileSelect = () => {
  fileInput.value.click();
};

// 이미지 업로드 처리
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);

  try {
    // 예시 - axios로 서버에 이미지 업로드
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // 업로드 성공 후 이미지 URL 반영
    profileImage.value = response.data.imageUrl; // 서버에서 받은 URL로 교체
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
  }
};


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

  height:auto;
  overflow: visible;
}

.settings-container.scrollable {
  overflow-y: hidden; /* 세로 스크롤바 표시 */
  max-height: 100vh; /* 최대 높이 설정 */
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
  overflow: hidden;
}

.withdrawal-section {
  margin-top: 80px;
  padding-top: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* y축 중앙 정렬 */
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

.nickname-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.nickname-container {
  margin-left: 30px; /* 원하는 거리만큼만 이동 */
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  font-weight: bold;
  gap: 8px;

}

.status-text {
  color: #666;
  font-size: 14px;
  font-weight: bold;
}

.email-container {
  position: absolute;
  left: 400px;
}

.toggle-container {
 position: absolute;
  left: 400px;
  margin-top: 8px;
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
  height: 35px;
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
  background: #ff0000;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
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

.nickname-edit {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nickname-input {
  width: 200px;
  height: 25px;
  border: 1px solid #FD6F22; /* 주황색 테두리 */
  border-radius: 4px;
  margin-left: 140px;
  padding: 0 8px;
  font-size: 14px;
  background-color: #000; /* 검정색 배경 */
  color: #fff; /* 흰색 텍스트 */
}

.save-button {
  background: #FD6F22;
  color: white;
  border: none;
  width: 60px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.password-edit-container {
  display: flex;
  flex-direction: column;
  gap: 45px;
  padding: 16px 0;
  overflow: hidden;
}
.password-edit-container.scrollable {
  overflow-y:hidden; /* 세로 스크롤바 표시 */
}
.password-input {
  width: 95%;
  height: 50px;
  border: 1px solid #ccc; /* 회색 테두리 */
  
  border-radius: 4px;
  padding: 0 8px;
  font-size: 14px;
  background-color: #000; /* 검정색 배경 */
  color: #fff; /* 흰색 텍스트 */
  overflow: visible;
}

.password-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  overflow: visible;
}

.cancel-button {
  background: #2a2a2a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  width:60px;
  height: 30px;
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
}

.save-button {
  background: #fd6f22;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button, .save-button {
  display: flex; /* 플렉스 박스를 사용하여 텍스트를 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  text-align: center; /* 텍스트 정렬 */
  padding: 0; /* 내부 여백 제거 */
}

html, body {
  overflow: hidden;
  height: 100%;
}
</style>
