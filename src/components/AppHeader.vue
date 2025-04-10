<template>
    <header class="header">
        <!-- 왼쪽: 로고 -->
        <div class="left">
        <img src="../assets/icons/marktory-logo.svg" alt="MARKTORY 로고" class="logo" />
        </div>

        <!-- 오른쪽: 메뉴들 -->
        <div class="right">
            <button class="icon-btn">
                <img src="../assets/icons/searchIcon.svg" alt="검색" class="icon" />
            </button>
            <button class="icon-btn">
                <img src="../assets/icons/notification.svg" alt="알림" class="icon" />
            </button>
            <button class="write-btn">
                글 쓰기
            </button>
            <button class="login-btn">
                로그인
            </button>
        </div>
    </header>
</template>

<script setup>

</script>

<style scoped>
.header {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    background-color: black;
}

.left .logo {
    height: 32px;
}

.right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: white;
}

.icon {
    width: 24px;
    height: 24px;
    color: white; /* 중요! */
    fill: white;  /* 이건 fallback 용 */
}

.write-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border: 2px solid white;
    border-radius: 20px;
    background: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.login-btn{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 20px;
    background: #FD6F22;
    color: white;
    font-weight: bold;
}

.write-icon {
    width: 20px;
    height: 20px;
}
</style>