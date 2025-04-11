<template>
    <transition name="bottom-fade">
        <div class="bottom-sheet" v-if="visible">
            <div class="sheet-overlay" @click="close" />
            <div class="sheet-content">
                <header class="sheet-header">
                    <h2 class="sheet-title">출간</h2>
                </header>

                <section class="sheet-body">
                    <div class="section">
                        <label class="label">제목</label>
                        <div class="value">{{ title }}</div>
                    </div>

                    <div class="section">
                        <label class="label">공개 범위</label>
                        <div class="radio-group">
                            <label v-for="option in visibilityOptions" :key="option.value" class="radio-item">
                                <input type="radio" v-model="visibility" :value="option.value" />
                                {{ option.label }}
                            </label>
                        </div>
                    </div>

                    <div class="section">
                        <label class="label">구분</label>
                        <div class="tags">
                            <span :class="['tag', { active: type === 'post' }]" @click="type = 'post'">게시글</span>
                            <span :class="['tag', { active: type === 'template' }]"
                                @click="type = 'template'">템플릿</span>
                        </div>
                    </div>

                    <div class="section">
                        <label class="label">소개글</label>
                        <textarea v-model="description" maxlength="200" rows="4" placeholder="소개글을 입력하세요"></textarea>
                        <div class="char-count">{{ description.length }}/200</div>
                    </div>
                </section>

                <footer class="sheet-footer">
                    <button class="btn cancel" @click="close">취소</button>
                    <button class="btn publish" @click="publish">출간하기</button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    visible: Boolean,
    title: String
})
const emits = defineEmits(['close', 'publish'])

const visibility = ref('public')
const type = ref('post')
const description = ref('')

const visibilityOptions = [
    { label: '공개', value: 'public' },
    { label: '구독', value: 'subscriber' },
    { label: '비공개', value: 'private' }
]

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
    color: #fff;
    padding: 1.5rem;
    border-radius: 16px 16px 0 0;
    transform: translateY(0);
}

.sheet-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

.section {
    margin-bottom: 1.2rem;
}

.label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.value {
    font-size: 1.1rem;
}

.radio-group {
    display: flex;
    gap: 1rem;
}

.radio-item input {
    margin-right: 0.3rem;
}

.tags {
    display: flex;
    gap: 0.5rem;
}

.tag {
    padding: 0.3rem 0.8rem;
    border-radius: 9999px;
    background: #555;
    cursor: pointer;
}

.tag.active {
    background: #f58220;
    color: #000;
}

textarea {
    width: 100%;
    border: none;
    padding: 0.5rem;
    background: #1e1e1e;
    color: #fff;
    resize: none;
    border-radius: 8px;
}

.char-count {
    text-align: right;
    font-size: 0.8rem;
    color: #888;
    margin-top: 0.3rem;
}

.sheet-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}

.btn {
    padding: 0.5rem 1.2rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
}

.btn.cancel {
    background: #444;
    color: #fff;
}

.btn.publish {
    background: #f58220;
    color: #000;
}

/* 애니메이션 */
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
</style>