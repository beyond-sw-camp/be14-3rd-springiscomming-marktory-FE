<template>
    <header>
        <AppHeader/>
    </header>
    <div class="mypage">
        <header class="header">
            <div class="mypage-title">LGTM</div>
            <div class="mypagemenu-row">
                <RouterLink to="/mypage/kasey/post" class="tab" active-class="active">
                    <div class="post">
                        <span class="post-label">게시글</span>
                    </div>
                </RouterLink>
                <RouterLink to="/mypage/kasey/temp" class="tab" active-class="active">
                    <div class="temp">
                        <span class="temp-label">템플릿</span>
                    </div>
                </RouterLink>
                <div class="filter">
                    <span class="filter-label">전체</span>
                </div>
            </div>
        </header>
        <main>
            <div class="mypage-row">
                <div class="mypage-left">
                    <OtherSideProfile/>
                    <div class="category">
                        <Category />
                    </div>
                </div>
                <div class="mypage-postcardlist">
                    <RouterView/>    
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import AppHeader from '../components/AppHeader.vue';
    import OtherSideProfile from '../components/mypage/OtherSideProfile.vue';
    import Category from '../components/post/Category.vue';
    import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
    .header {
        position: fixed;
        z-index: 100;
    }

    .mypage {
        max-width: 1440px;
        margin: 0 auto;
        color: white;
        background-color: black;
    }

    .mypage-title {
        width: 1440px;
        margin-top: 70px;
        padding-left: 91px;
        padding-top: 94px;
        font-size: 96px;
        z-index: 100;
        color: white;
        background-color: black;
    }

    .mypage-row {
        display: flex;
    }

    .mypage-postcardlist {
        margin-left: 338px;
        margin-top: 444px;
        z-index: 1;
    }

    .mypagemenu-row {
        width: 1440px;
        padding-bottom: 8px;
        display: flex;
        background-color: black;

    }

    .post {
        padding-left: 355px;
        
    }

    .post-label {
        padding-bottom: 10px;
        font-size: 23px;
        display: inline-block;
        color: white;
    }

    .temp {
        padding-left: 20px;
    }

    .temp-label {
        font-size: 23px;
        display: inline-block;
    }

    .filter {
        padding-left: 660px;
        padding-top: 60px;
    }

    .filter-label {
        width: 133px;
        height: 52px;
        padding-left: 14px;
        padding-top: 12px;
        border-radius: 10px;
        font-size: 18px;
        display: inline-block;
        background-color: #424242;
    }

    .mypage-left {
        position: fixed;
        top: 30px;
        margin: 0 auto;
        width: 262px;
        display: flex;
        flex-direction: column;
    }

    .category {
        padding-top: 50px;
    }

    .tab {
        padding: 8px 20px;
        font-size: 23px;
        text-decoration: none;
        color: white;
    }

    .tab .post-label,
    .tab .temp-label {
        border-bottom: 3px solid transparent;
        transition: border-color 0.3s;
    }

    .tab.active .post-label,
    .tab.active .temp-label {
        padding-bottom: 10px;
        color: #FD6F22;
        border-bottom-color: #FD6F22;
    }
</style>