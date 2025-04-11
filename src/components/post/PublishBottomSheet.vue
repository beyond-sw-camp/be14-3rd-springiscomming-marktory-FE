<template>
    <transition name="bottom-fade">
        <div class="bottom-sheet" v-if="visible">
            <div class="sheet-overlay" />
            <div class="sheet-content">
                <header class="sheet-header">
                    <h2 class="sheet-title">출간</h2>
                    <hr style="color: white; margin-top: 0.5rem; margin-bottom: 1.5rem;" />
                </header>

                <section class="sheet-body">
                    <div class="section title-section">
                        <div class="value">{{ title }}</div>
                    </div>

                    <!-- 공개 범위 -->
                    <div class="section row-section">
                        <div class="section-label">기본</div>
                        <div class="options">
                            <label v-for="option in visibilityOptions" :key="option.value"
                                :class="['pill-option', { active: visibility === option.value }]"
                                @click="visibility = option.value">
                                <img :src="visibility === option.value
                                    ? '/src/assets/post/check-fill.svg'
                                    : '/src/assets/post/check-empty.svg'" alt="선택됨" class="check-icon" />
                                {{ option.label }}
                            </label>
                        </div>
                    </div>


                    <div class="section row-section">
                        <div class="section-label">구분</div>
                        <div class="tags">
                            <span :class="['tag', { active: type === 'post' }]" @click="type = 'post'">게시글</span>
                            <span :class="['tag', { active: type === 'template' }]"
                                @click="type = 'template'">템플릿</span>
                        </div>
                    </div>

                    <div v-if="type === 'post'">
                        <!-- 카테고리 -->
                        <div class="section row-section category-section" ref="dropdownRef">
                            <div class="section-label">카테고리</div>
                            <div class="dropdown-wrapper">
                                <button class="category-dropdown" @click="toggleDropdown">
                                    {{ selectedCategory || '카테고리' }}
                                    <span class="chevron">
                                        <img src="@/assets/post/arrow.svg" alt="" width="10px" height="10px">
                                    </span>
                                </button>

                                <ul v-if="dropdownOpen" class="dropdown-menu">
                                    <li v-for="(cat, index) in categoryList" :key="index" @click="selectCategory(cat)">
                                        {{ cat }}
                                    </li>
                                </ul>
                            </div>

                        </div>


                        <!-- 링크 -->
                        <div class="section row-section">
                            <div class="section-label">링크</div>
                            <div class="link-value">https://marktory.com/morris</div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="section intro-section">
                            <label class="label">소개글</label>
                            <div class="textarea-wrapper">
                                <textarea v-model="description" maxlength="200" rows="4"
                                    placeholder="소개글을 입력하세요"></textarea>
                                <div class="char-count">{{ description.length }}/200</div>
                            </div>
                        </div>
                    </div>

                </section>

                <footer class="sheet-footer">
                    <button class="btn cancel" @click="close">취소</button>
                    <button class="btn publish" @click="publish" :disabled="!isValid">출간하기</button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    visible: Boolean,
    title: String
})
const emits = defineEmits(['close', 'publish']);

const visibility = ref('public');
const type = ref('post');
const description = ref('');

const descriptionLen = computed(() => description.value.trim().length);

const categoryList = ['프론트엔드', '백엔드', 'AI', '모바일'];
const selectedCategory = ref('');
const dropdownOpen = ref(false);

const menuWidth = ref('10ch');

onMounted(() => {
    const maxLen = Math.max(...categoryList.map(c => c.length))
    menuWidth.value = `${maxLen + 2}ch` // +2는 아이콘 여유
})

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
    console.log('dropdownOpen?', dropdownOpen.value);
}

const selectCategory = (cat) => {
    selectedCategory.value = cat;
    dropdownOpen.value = false;
}

const visibilityOptions = [
    { label: '공개', value: 'public' },
    { label: '구독', value: 'subscriber' },
    { label: '비공개', value: 'private' }
]

const isValid = computed(() => {
    if (type.value === 'post') {
        return true;
    }

    return type.value === 'template' && descriptionLen.value > 0;
});

const close = () => emits('close')
const publish = () => {
    emits('publish', {
        visibility: visibility.value,
        type: type.value,
        description: description.value
    })
    close()
}
</script>

<style scoped>
.bottom-sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    font-family: inherit;
}

.sheet-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4);
}

.sheet-content {
    background-color: #2b2b2b;
    overflow: visible !important;
    color: #fff;
    padding: 2rem;
    border-radius: 16px 16px 0 0;
    transform: translateY(0);
    max-width: 100%;
    margin: 0 auto;
}

.sheet-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.section {
    margin-bottom: 1.8rem;
}

.label {
    display: block;
    margin-bottom: 0.75rem;
    font-weight: bold;
    font-size: 0.95rem;
}

.value {
    font-size: 1.1rem;
    font-weight: 600;
}

.radio-group.pill-style {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.pill-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    color: #ccc;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.pill-option.active {
    color: #f58220;
}

.check-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}

.tags {
    display: flex;
    gap: 2rem;
    font-size: 1rem;
}

.tag {
    color: #ccc;
    font-weight: 500;
    cursor: pointer;
}

.tag.active {
    color: #f58220;
    font-weight: 700;
}

.textarea-wrapper {
    background-color: #111;
    padding: 1rem;
    border-radius: 8px;
}

textarea {
    width: 100%;
    border: none;
    background: transparent;
    color: #fff;
    resize: none;
    font-size: 0.95rem;
    line-height: 1.6;
    font-family: inherit;
    border: none;
    outline: none;
}

.char-count {
    text-align: right;
    font-size: 0.8rem;
    color: #ccc;
    margin-top: 0.3rem;
}

.sheet-footer {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 1.5rem;
}

.btn {
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 0.95rem;
    cursor: pointer;
}

.btn.cancel {
    background: #a9a9a9;
    color: #fff;
}

.btn.publish {
    background: #f58220;
    color: #fff;
}

.bottom-fade-enter-active,
.bottom-fade-leave-active {
    transition: all 0.35s ease;
}

.bottom-fade-enter-from {
    transform: translateY(100%);
    opacity: 0;
}

.bottom-fade-enter-to {
    transform: translateY(0%);
    opacity: 1;
}

.bottom-fade-leave-from {
    transform: translateY(0%);
    opacity: 1;
}

.bottom-fade-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

.row-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.section-label {
    min-width: 50px;
    font-weight: bold;
    font-size: 0.95rem;
    color: #fff;
    flex-shrink: 0;
}

/* 버튼 그룹 */
.options {
    display: flex;
    gap: 0rem;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -1rem;
}

.pill-option {
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    color: #ccc;
    cursor: pointer;
}

.pill-option.active {
    color: #f58220;
}

.category-dropdown {
    background-color: #3a3a3a;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.3rem 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.category-dropdown .chevron {
    font-size: 0.9rem;
    /* transform: translateY(0px); */
    /* 살짝 아래로 */
}

.dropdown-wrapper {
    position: relative;
}

.dropdown-menu {
    /* all: unset; */
    /* 모든 기본 스타일 제거 */
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    background: #222;
    position: absolute;
    z-index: 1;
}


.dropdown-menu li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: #eee;
}

.dropdown-menu li:hover {
    background-color: #444;
}
</style>