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

            <template v-if="isLogined">
                <button class="write-btn">글 쓰기</button>

                <!-- 프로필 & 드롭다운 버튼 그룹 -->
                <div class="profile-wrapper" ref="dropdownRef">
                <div class="profile-trigger" @click="toggleDropdown">
                    <img
                    src="../assets/icons/pochaco.png"
                    alt="프로필 사진"
                    class="profile_image"
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
                        src="../assets/icons/pochaco.png"
                        class="dropdown_profile_image"
                        />
                        <div>
                            <p class="name">D</p>
                            <p class="email">D1112@mail.com</p>
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

const router = useRouter()
const isLogined = ref(true)
const showDropdown = ref(false)
const dropdownRef = ref(null)

function goHome() {
    router.push('/').then(() => window.location.reload())
}

function toggleDropdown() {
    showDropdown.value = !showDropdown.value
}

function logout() {
    isLogined.value = false
    showDropdown.value = false
    // 실제 로그아웃 처리 로직
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
/* ✅ 헤더 전체 배경 채움 */
.header {
    width: 100%;
}

/* ✅ 내용물은 Figma 기준 1440px에 정렬 */
.header-inner {
    max-width: 1440px;
    height: 94px; /* Figma 기준 */
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: black;
}

/* 왼쪽 로고 */
.left .logo {
    width: 257.88px;
    height: 44px;
    object-fit: contain; /* 혹은 cover, 필요에 따라 */
    cursor: pointer;
}

/* 오른쪽 메뉴 그룹 */
.right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px; /* Figma 상 더 정확한 간격 원하면 여기도 조정 */
    width: 331px;   /* ✅ Figma 기준 */
    height: 55px;   /* ✅ Figma 기준 */
}

/* 기본 아이콘 버튼 스타일 */
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

/* 아이콘 기본값 제거 */
.icon {
    width: auto;
    height: auto;
}

/* 각각의 아이콘에 정확한 크기 적용 */
.search-icon {
    width: 33px;
    height: 33px;
}

.notification-icon {
    width: 35px;
    height: 35px;
}

.write-btn {
    width: 120px;
    height: 44px;
    border: 2px solid white;
    border-radius: 20px;
    background: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Noto Sans KR', sans-serif; /* ✅ 폰트 패밀리 추가 */
    font-size: 23px; /* ✅ 폰트 사이즈 적용 */
    font-weight: bold;
}

.login-btn {
    width: 120px;
    height: 44px;
    background-color: #fd6f22;
    color: white;
    border: none;
    border-radius: 9999px;
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
    gap: 6px;
    cursor: pointer;
}
/* ✅ 프로필 사진: 55x55로 확대 */
.profile_image {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
}

/* ✅ 드롭다운 아이콘 (chevron) */
.chervon-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
}
/* 로그인 된 상태에서 적용하는 css */
.profile-wrapper {
    position: relative;
}

.profile-dropdown-menu {
    position: absolute;
    top: 40px;
    right: 0;
    background: #424242;
    color: white;
    width: 305px; /* ✅ Figma 기준 */
    height: 346px; /* ✅ Figma 기준 */
    border-radius: 12px;
    padding: 0; /* 여백 제거 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.dropdown-header {
    display: flex;
    align-items: center;
    gap: 12px; /* ✅ 이미지와 텍스트 사이 간격 */
    height: 74px;
    padding: 0 16px;
}

.profile_image {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
}

/* ✅ 텍스트 박스를 flex로 묶어 정렬 보정 */
.profile-text-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0; /* ✅ overflow 방지를 위한 필수값 */
}

.name {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
    margin: 0 0 4px 0;
    color: white;
}

.email {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    color: #aaa;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px; /* ✅ 필요 시 조정 */
}
.dropdown_profile_image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
}
.menu-list {
    padding: 0;
    margin: 0;
    list-style: none;
    flex: 1;
}
.menu-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.menu-list li {
    height: 67px; /* ✅ Figma 기준 */
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
    font-size: 18px;
}

.menu-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.dropdown-font {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    line-height: 1;
}
</style>