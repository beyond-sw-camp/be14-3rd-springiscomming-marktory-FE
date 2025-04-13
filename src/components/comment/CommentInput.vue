<template>
    <section class="comment-input-wrapper">
        <div :class="['input-area', { active: isFocused || inputText }]">
            <textarea v-model="inputText" @focus="isFocused = true" @blur="isFocused = false" placeholder="댓글을 입력하세요"
                maxlength="500"></textarea>
            <div class="char-count">{{ inputText.length }}/500</div>
        </div>
        <button class="submit-btn" :disabled="!inputText.trim()" @click="submitComment">
            등록
        </button>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const inputText = ref('')
const isFocused = ref(false)

const emit = defineEmits(['submit'])

const submitComment = () => {
    if (!inputText.value.trim()) return
    emit('submit', inputText.value.trim())
    inputText.value = ''
}
</script>

<style scoped>
.comment-input-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 0.75rem;
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
}

.input-area {
    background-color: #2a2a2a;
    border-radius: 12px;
    padding: 1rem;
    position: relative;
    transition: border 0.3s;
}

.input-area.active {
    border: 1px solid #f58220;
}

textarea {
    width: 100%;
    height: 120px;
    background: transparent;
    border: none;
    resize: none;
    outline: none;
    color: white;
    font-size: 1rem;
    line-height: 1.6;
    caret-color: #f58220;
}

textarea::placeholder {
    color: #aaa;
}

.char-count {
    position: absolute;
    right: 1rem;
    top: 0.75rem;
    font-size: 0.85rem;
    color: #ccc;
}

.submit-btn {
    align-self: flex-end;
    background-color: #f58220;
    color: white;
    font-weight: bold;
    padding: 0.6rem 1.5rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
}

.submit-btn:disabled {
    background-color: #aaa;
    cursor: not-allowed;
}
</style>