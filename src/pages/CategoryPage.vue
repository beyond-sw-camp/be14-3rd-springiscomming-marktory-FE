<template>
    <header>
        <AppHeader />
    </header>
    <div class="categorypage">
        <header class="header">
            <div class="mypage-title">LGTM</div>
            <div class="category-row">
                <div class="category">
                    <span>카테고리 관리</span>
                </div>
                <div class="save" @click="goToMypage">
                    <span>저장</span>
                </div>
            </div>
        </header>
        <main>
            <div class="mypage-row">
                <div class="mypage-left">
                    <div class="profile">
                        <SideProfile />
                    </div>
                </div>
                <div class="category-main">
                    <div class="category-list">
                        <CategoryItem
                            v-for="cat in categories"
                            :key="cat.id"
                            :category="cat"
                            @update="updateCategory"
                            @delete="deleteCategory"/>
                        <div :class="['new-category', { active: isFocused || newCategory }]">
                            <input
                                v-model="newCategory"
                                @focus="isFocused = true"
                                @blur="isFocused = false"
                                placeholder="새 카테고리를 입력하세요."/>
                        </div>
                        <div class="register-btn-wrapper">
                            <button class="register-btn" @click="addCategory" :disabled="!newCategory.trim()">등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <SideFooter />
        </footer>
    </div>
</template>
  
<script setup>
    import AppHeader from '../components/AppHeader.vue';
    import SideFooter from '../components/footer/SideFooter.vue';
    import SideProfile from '../components/mypage/SideProfile.vue';
    import CategoryItem from '../components/category/CategoryItem.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const categories = ref([
    { id: 1, name: '자바' },
    { id: 2, name: '파이썬' },
    { id: 3, name: '성장 기록' },
    { id: 4, name: '공부 방법' },
    { id: 5, name: '회고' }
    ]);

    const newCategory = ref('');
    const isFocused = ref(false);

    function addCategory() {
    if (!newCategory.value.trim()) return;
    categories.value.push({
        id: Date.now(),
        name: newCategory.value.trim()
    });
    newCategory.value = '';
    isFocused.value = false;
    }

    function updateCategory(updated) {
    const item = categories.value.find(c => c.id === updated.id);
    if (item) item.name = updated.name;
    }

    function deleteCategory(id) {
    categories.value = categories.value.filter(c => c.id !== id);
    }

    function goToMypage() {
    router.push('/mypage');
    }
</script>

<style scoped>
    .categorypage {
        max-width: 1440px;
        margin: 0 auto;
        color: white;
        background-color: black;
    }

    .header {
        position: fixed;
        z-index: 100;
    }

    .mypage-title {
        margin-top: 94px;
        padding-left: 91px;
        padding-top: 94px;
        font-size: 96px;
        z-index: 10;
        background-color: black;
        color: white;
    }

    .category-row {
        z-index: 10;
        background-color: black;
        display: flex;
        align-items: flex-start;
    }

    .category {
        margin-left: 355px;
        margin-top: 50px;
        font-size: 23px;
        padding-bottom: 10px;
        border-bottom: 2px solid #FD6F22;
        color: #FD6F22;
    }

    .save {
        width: 133px;
        height: 52px;
        margin-left: 730px;
        margin-top: 85px;
        font-size: 18px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FD6F22;
    }

    .mypage-row {
        display: flex;
    }

    .mypage-left {
        position: fixed;
        top: 30px;
        width: 262px;
        display: flex;
        flex-direction: column;
    }

    .profile {
        position: relative;
        z-index: 101;
        margin-top: 15px;
    }

    .category-main {
        margin-left: 338px;
        padding-top: 500px;
    }

    .category-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        z-index: 1;
    }

    .new-category {
        width: 803px;
        height: 80px;
        border: 1px solid white;
        padding: 0 16px;
        display: flex;
        align-items: center;
        color: white;
        transition: 0.2s;
    }

    .new-category input {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        font-size: 23px;
        color: inherit;
    }

    .new-category.active {
        border: 1px solid #FD6F22;
        color: #FD6F22;
    }

    .register-btn-wrapper {
        width: 803px;
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
    }

    .register-btn {
        width: 133px;
        height: 52px;
        background-color: #FD6F22;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 18px;
        cursor: pointer;
    }

    .register-btn:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
</style>
