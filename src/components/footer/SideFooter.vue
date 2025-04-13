<!--
    사이드에 있는 Footer
-->
<template>
    <footer class="footer">
        <div class="footer-info">
            <p>마크토리</p>
            <p>사업자등록번호 : 123-45-67899</p>
            <p>주소 : (07060) 서울 동작구 보라매로 87</p>
            <p>대표 : 봄이오조팀</p>
            <p>이메일 : marktory@gmail.com</p>
        </div>
        <div class="footer-links">
            <RouterLink to="/policy/service">정책 관련 링크</RouterLink>
            <RouterLink to="/policy/privacy">개인정보처리정책</RouterLink>
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 172px;
    height: 125px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 10px;
    font-weight: bold;
    color: #D4D4D4;
    padding: 6px 8px;              /* ✅ 줄임 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    overflow: hidden;              /* ✅ 안전 */
    z-index: 100;
}

.footer-info p {
    margin: 0 0 2px 0;
    line-height: 1.2;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.footer-links a,
.footer-links :deep(a) {
    color: #D4D4D4;
    font-size: 10px;
    font-weight: bold;
    text-decoration: none;    /* ✅ 밑줄 제거 */
    cursor: pointer;
}

.footer-links a:hover {
    text-decoration: none;    /* ✅ hover 시에도 변화 없음 */
}
</style>