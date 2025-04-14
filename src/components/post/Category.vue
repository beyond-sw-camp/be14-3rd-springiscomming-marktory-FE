<template>
    <aside class="category-box">
        <div class="category-title">
            카테고리 <img
                        src="@/assets/icons/category.svg"
                        alt="카테고리 수정"
                        class="emoji clickable-icon"
                        @click="goToCategoryPage"/>
        </div>
        <div class="category-list">
            <div v-for="(item, index) in categories" :key="index" class="category-item">
                {{ typeof item === 'string' ? item : item.name }}
            </div>
        </div>
    </aside>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Category',
  props: {
    categories: {
      type: Array,
      default: () => ['자바', '파이썬', '성장 기록', '공부 방법', '회고'],
    },
  },
  setup() {
    const router = useRouter();

    const goToCategoryPage = () => {
      router.push('/categorypage');
    };

    return { goToCategoryPage };
  },
};
</script>


<style scoped>
.category-box {
    background-color: #000;
    color: #FD6F22;
    padding: 1rem;
    font-family: 'Helvetica Neue', sans-serif;
    width: fit-content;
}

.category-title {
    font-size: 0.8rem;
    color: #FD6F22;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.category-list {
    border-left: 3px solid #FD6F22;
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

.emoji {
  margin-left: 0.3rem;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.emoji:hover {
  filter: brightness(1.2);
}
</style>