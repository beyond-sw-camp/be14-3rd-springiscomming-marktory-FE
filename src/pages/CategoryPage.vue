<template>
    <header>
        <AppHeader/>
    </header>
    <div class="categorypage">
        <header class="header">
            <div class="mypage-title">LGTM</div>
            <div class="category-row">
                <div class="category">
                    <span>카테고리 관리</span>
                </div>
                <div class="save">
                    <span>저장</span>
                </div>
            </div>
        </header>
        <main>
            <div class="mypage-row">
                <div class="mypage-left">
                    <SideProfile />
                </div>
            </div>
        </main>
        <footer>
            <SideFooter/>
        </footer>
    </div>
</template>

<script setup>
    import AppHeader from '../components/AppHeader.vue';
    import SideFooter from '../components/footer/SideFooter.vue';
    import SideProfile from '../components/mypage/SideProfile.vue';
</script>

<style scoped>
    .header {
        position: fixed;
        z-index: 100;
    }

    .categorypage {
        max-width: 1440px;
        margin: 0 auto;
        color: white;
        background-color: black;
    }

    .mypage-title {
        width: 1440px;
        margin-top: 94px;
        padding-left: 91px;
        padding-top: 94px;
        font-size: 96px;
        z-index: 100;
        color: white;
        background-color: black;
    }

    .category-row {
        display: flex;
        align-items: flex-start;
    }

    .category {
        margin-left: 355px;
        margin-top: 50px;
        font-size: 23px;
        padding-bottom: 10px;
        position: relative;
        display: inline-block;
        color: #FD6F22;
        border-bottom: 2px solid #FD6F22;
    }
    
    .save {
        width: 133px;
        height: 52px;
        margin-left: 730px;
        margin-top: 85px;
        font-size: 18px;
        border-radius: 10px;
        position: relative;
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FD6F22;
    }

    .mypage-left {
        position: fixed;
        top: 30px;
        margin: 0 auto;
        width: 262px;
        display: flex;
        flex-direction: column;
    }
</style>