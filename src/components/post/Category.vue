<template>
    <aside class="category-box">
        <div class="category-title">
            카테고리 <span class="emoji">✏️</span>
        </div>
        <div class="category-list">
            <div v-for="(item, index) in categories" :key="index" class="category-item">
                {{ item.name }}
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'Category',
    props: {
        categories: {
            type: Array,
            default: () => ['자바', '파이썬', '성장 기록', '공부 방법', '회고'],
        },
    },
};
</script>


<style scoped>
.category-box {
    background-color: #000;
    color: #f58220;
    padding: 1rem;
    font-family: 'Helvetica Neue', sans-serif;
    width: fit-content;
    margin-top: 70px;
}

.category-title {
    font-size: 0.8rem;
    color: #ccc;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.emoji {
    margin-left: 0.3rem;
    font-size: 0.9rem;
}

.category-list {
    border-left: 3px solid #f58220;
    padding-left: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.category-item {
    font-size: 1.2rem;
    font-weight: 400;
    cursor: pointer;
    transition: color 0.2s;
}

.category-item:hover {
    color: #fff;
}
</style>