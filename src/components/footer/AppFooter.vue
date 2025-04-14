<!-- 중앙 메인 아래에 있는 Footer -->
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
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;              /* ✅ 400px → 퍼센트로 유연하게 */
    max-width: 400px;        /* ✅ 최대폭은 유지 */
    height: 62px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 20px;
    color: #808080;
    z-index: 100;
    padding-top: 10px;
}

.footer-links {
width: 400px;
height: 22px;
flex-direction: row;

display: flex;
justify-content: space-evenly;
align-items: center;
}

.footer-link {
font-size: 18px;
font-weight: 500;
color: #888888;
text-decoration: none;
}

.footer-link:hover {
color: #444;
}

.footer-logo img {
width: 120px;
height: 20px;
object-fit: contain;
}
</style>