<!--
    중앙 메인 아래에 있는 Footer
-->
<template>
    <footer class="footer-container">
        <div class="footer-links">
        <router-link to="/terms" class="footer-link">이용약관</router-link>
        <router-link to="/privacy" class="footer-link">개인정보 처리방침</router-link>
        <router-link to="/notice" class="footer-link">공지사항</router-link>
        </div>
    <div class="footer-logo">
    <img src="../../assets/icons/marktory-logo-gray.svg" alt="Marktory-logo" />
    </div>
    </footer>
</template>
<script setup>

</script>

<style scoped>
.footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    z-index: 100;
}

.footer-links {
    display: flex;
    gap: 60px; /* 👉 글자 사이 간격 넓게 */
    margin-bottom: 8px;
}

.footer-link {
    font-weight: 700;
    font-size: 15px; /* 👉 글자 크기 키우기 */
    cursor: pointer;
    color: #888888; /* 이미지처럼 회색 톤 */
    text-decoration: none;
}

.footer-link:hover {
  color: #444; /* 살짝 어두워지게 */
}

.footer-logo img {
    transform-origin: top center; /* 위에서 아래로 확장되게 */
}
</style>