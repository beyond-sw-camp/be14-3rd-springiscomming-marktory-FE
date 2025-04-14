<template>
    <header class="header">
    <!-- 왼쪽: 로고 -->
        <div class="header-inner">
            <div class="left">
            <img
                src="../assets/icons/marktory-logo.svg"
                alt="MARKTORY 로고"
                class="logo"
                @click="goHome"
            />
        </div>

            <!-- 오른쪽 메뉴들 -->
        <div class="right">
            <button class="icon-btn">
                <img src="../assets/icons/search.svg" alt="검색" class="icon search-icon" />
            </button>
            <button class="icon-btn">
                <img src="../assets/icons/notification.svg" alt="알림" class="icon notification-icon" />
            </button>

            <template v-if="memberStore.isLogined">
                <button class="write-btn">글 쓰기</button>

                <!-- 프로필 & 드롭다운 버튼 그룹 -->
                <div class="profile-wrapper" ref="dropdownRef">
                <div class="profile-trigger" @click="toggleDropdown">
                    <img
                        :src="memberStore.user?.image || defaultProfile"
                        class="profile_image"
                        alt="프로필 이미지"
                    />
                    <img
                    src="../assets/icons/chervon-down.svg"
                    alt="드롭다운 버튼"
                    class="chervon-icon"
                    />
                </div>

                <!-- 드롭다운 -->
                <template v-if="showDropdown">
                    <div class="profile-dropdown-menu">
                    <div class="dropdown-header">
                        <img
                        :src="memberStore.user?.image || defaultProfile"
                        class="dropdown_profile_image"
                        />
                        <div>
                            <p class="name">{{ memberStore.user?.nickname }}</p>
                            <p class="email">{{ memberStore.user?.email }}</p>
                        </div>
                    </div>
                    <ul class="menu-list">
                        <li @click="goTo('settings')">
                            <img src="../assets/icons/settings.svg" alt="설정 아이콘" class="menu-icon"/>    
                            <p class="dropdown-font">설정</p>
                        </li>
                        <li @click="goTo('notice')">
                            <img src="../assets/icons/notice.svg" alt="공지사항 아이콘" class="menu-icon"/>
                            <p class="dropdown-font">공지사항</p>
                        </li>
                        <li @click="goTo('activity')">
                            <img src="../assets/icons/activity.svg" alt="내 활동 아이콘" class="menu-icon"/>
                            <p class="dropdown-font">내 활동</p>
                        </li>
                        <li @click="logout">
                            <img src="../assets/icons/logout.svg" alt="로그아웃 아이콘" class="menu-icon"/>
                            <p class="dropdown-font">로그아웃</p>
                        </li>
                    </ul>
                    </div>
                </template>
            </div>
        </template>
        <template v-else>
            <button class="write-btn" @click="goTo('login')">글 쓰기</button>
            <button class="login-btn" @click="goTo('login')">로그인</button>
        </template>
        </div>
    </div>
</header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '../stores/memberStore'
import defaultProfile from '../assets/icons/defaultProfile.png'

const router = useRouter()
const memberStore = useMemberStore()
const showDropdown = ref(false)
const dropdownRef = ref(null)

function goHome() {
    router.push('/').then(() => window.location.reload())
}

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function logout() {
    memberStore.logout()
    showDropdown.value = false
    router.push('/') 
}

function goTo(page) {
    showDropdown.value = false
    switch (page) {
        case 'settings':
        router.push('/settings')
        break
        case 'notice':
        router.push('/notices')
        break
        case 'activity':
        router.push('/activity')
        case 'login':
            router.push('/login');
        break
    }
}

function handleClickOutside(e) {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        showDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
})
</script>

<style scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: black;
    z-index: 9999;
}

.header-inner {
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding: 0 clamp(16px, 2vw, 24px);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* 로고 */
.left .logo {
    width: 230px;
    height: 44px;
    object-fit: contain;
    cursor: pointer;
}

/* 오른쪽 메뉴 */
.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: clamp(10px, 1.2vw, 16px);
    height: clamp(40px, 4vw, 55px);
}

/* 아이콘 버튼 */
.icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    width: auto;
    height: auto;
}

.search-icon {
    width: 25px;
    height: 25px;
}

.notification-icon {
    width: 25px;
    height: 25px;
}

.write-btn {
    width: 90px;
    height: 42px;
    border: 2px solid white;
    border-radius: 20px;
    background: none;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-btn {
    width: 90px;
    height: 42px;
    background-color: #fd6f22;
    color: white;
    border: none;
    border-radius: 9999px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-trigger {
    display: flex;
    align-items: center;
    gap: clamp(4px, 0.6vw, 6px);
    cursor: pointer;
}

.profile_image{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
}

.chervon-icon {
    width: clamp(14px, 2vw, 20px);
    height: clamp(14px, 2vw, 20px);
    object-fit: contain;
}

.profile-wrapper {
    position: relative;
}

.profile-dropdown-menu {
    position: absolute;
    top: 40px;
    right: 0;
    background: #424242;
    color: white;
    width: 240px; /* ✅ 가로 너비 줄임 */
    border-radius: 10px;
    padding: 16px 0; /* ✅ 세로 여백 조금 증가 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;
}

/* 🔹 상단 프로필 */
.dropdown-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px 12px;
    /* ✅ 하얀 선 제거: border-bottom 삭제 */
}

.dropdown_profile_image {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
}

.profile-text-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
}

.name {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    color: white;
    font-family: 'Noto Sans KR', sans-serif;
}

.email {
    font-size: 12px;
    font-weight: 400;
    color: #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
    margin: 2px 0 0;
    font-family: 'Noto Sans KR', sans-serif;
}

/* 🔹 메뉴 리스트 */
.menu-list {
    list-style: none;
    padding: 0;
    margin: 8px 0 0; /* ✅ 위에 살짝 간격 */
    font-family: 'Noto Sans KR', sans-serif;
}

.menu-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
}

.menu-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
}

.dropdown-font {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
}
</style>