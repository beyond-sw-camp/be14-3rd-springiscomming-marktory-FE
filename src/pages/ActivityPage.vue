<template>
    <div class="activity">
        <header class="header">
            <AppHeader/>
            <div class="mypage-title">LGTM</div>
            <div class="activitymenu-row">
                <RouterLink to="/activity/post" class="tab" active-class="active">
                    <div class="post">
                        <span class="post-label">좋아요 누른 게시글</span>
                    </div>
                </RouterLink>
                <RouterLink to="/activity/likecomment" class="tab" active-class="active">
                    <div class="likecomment">
                        <span class="likecomment-label">좋아요 누른 댓글</span>
                    </div>
                </RouterLink>
                <RouterLink to="/activity/writecomment" class="tab" active-class="active">
                    <div class="writecomment">
                        <span class="writecomment-label">내가 남긴 댓글</span>
                    </div>
                </RouterLink>
                <div class="filter">
                    <ArrayModal/>
                </div>
            </div>
        </header>
        <main>
            <div class="mypage-row">
                <div class="mypage-left">
                    <SideProfile />
                </div>
                <div class="activity-cardlist">
                    <RouterView/>   
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
    import AppHeader from '../components/AppHeader.vue';
    import SideProfile from '../components/mypage/SideProfile.vue';
    import ArrayModal from '../components/ArrayModal.vue';
    import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
    .header {
        position: fixed;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 100;
    }

    .activity {
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

    .activity-row {
        display: flex;
    }

    .activity-cardlist {
        margin-left: 338px;
        margin-top: 444px;
        z-index: 1;
    }

    .activitymenu-row {
        width: 1440px;
        padding-bottom: 8px;
        display: flex;
        background-color: black;
        flex-wrap: nowrap;
        white-space: nowrap;
        align-items: center;

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

    .likecomment {
        padding-left: 20px;
    }

    .likecomment-label {
        font-size: 23px;
        display: inline-block;
    }

    .writecomment {
        padding-left: 20px;
    }

    .writecomment-label {
        font-size: 23px;
        display: inline-block;
    }


    .filter {
        padding-left: 200px;
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

    .tab {
        padding: 8px 20px;
        font-size: 23px;
        text-decoration: none;
        color: white;
    }

    .tab .post-label,
    .tab .likecomment-label, 
    .tab .writecomment-label {
        border-bottom: 3px solid transparent;
        transition: border-color 0.3s;
    }

    .tab.active .post-label,
    .tab.active .likecomment-label,
    .tab.active .writecomment-label {
        padding-bottom: 10px;
        color: #FD6F22;
        border-bottom-color: #FD6F22;
    }
</style>