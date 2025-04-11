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
            <a href="#">정책 관련 링크</a>
            <a href="#">개인정보처리정책</a>
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
    width: 180px;
    color: #ccc;
    padding: 12px 8px;           /* ✅ padding 줄임 */
    font-size: 10px;             /* ✅ 글자 크기 줄임 */
    line-height: 1.4;            /* ✅ 줄 간격도 컴팩트하게 */
    z-index: 100;
    box-sizing: border-box;
}

.footer-info p {
    margin: 0 0 2px 0;           /* ✅ p 태그 간격 살짝 줄임 */
    font-weight: 500;
}

.footer-links {
    margin-top: 12px;            /* ✅ 전체 간격 줄임 */
    display: flex;
    flex-direction: column;
    gap: 3px;                    /* ✅ 링크 간격도 줄임 */
}

.footer-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 10px;             /* ✅ 링크는 살짝 더 작게 */
}

.footer-links a:hover {
    text-decoration: underline;
}
</style>