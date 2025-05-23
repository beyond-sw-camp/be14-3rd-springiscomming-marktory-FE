<template>
    <section class="comment-input-wrapper">
        <div :class="['input-area', { active: isFocused || inputText }]">
            <textarea v-model="inputText" @focus="isFocused = true" @blur="isFocused = false" placeholder="댓글을 입력하세요"
                maxlength="500"></textarea>
            <div class="char-count">{{ inputText.length }}/500</div>
        </div>
        <div class="action-row">
            <button class="cancel-btn" v-if="isEdit" @click="$emit('cancel')">취소</button>
            <button class="submit-btn" :disabled="!inputText.trim()" @click="submitComment">
                등록
            </button>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    initialText: {
        type: String,
        default: ''
    },
    isEdit: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['submit', 'cancel']);

const inputText = ref(props.initialText);
const isFocused = ref(false);

// 수정 모드일 경우 외부 텍스트 반영
watch(() => props.initialText, (val) => {
    inputText.value = val;
});

function submitComment() {
    const trimmed = inputText.value.trim();
    if (!trimmed) return;
    emit('submit', trimmed);
    if (!props.isEdit) {
        inputText.value = ''; // 새 댓글일 경우 초기화
    }
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

.action-row {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

.cancel-btn {
    background-color: #BDBDBD;
    color: white;
    font-weight: bold;
    padding: 0.6rem 1.5rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
}

.cancel-btn:hover {
    color: #fff;
    background-color: #444;
}

.submit-btn {
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