<template>
    <section class="editor-wrapper">
        <input v-model="titleSync" placeholder="제목입력" class="title-input" />

        <section class="tag-input-group">
            <span v-for="(tag, index) in tagList" :key="index" class="tag-badge">{{ tag }}</span>
            <input v-model="rawTagInput" placeholder="태그를 입력하세요" @keydown.enter.prevent="addTag" class="tag-input" />
        </section>

        <section class="editor-main">
            <vue-easymde :model-value="modelValue" :options="editorOptions" @update:modelValue="emitUpdate" />
        </section>

        <footer class="editor-footer">
            <button class="action-btn">← 나가기</button>
            <div class="btn-group">
                <button class="action-btn">임시저장</button>
                <button class="publish-btn" @click="$emit('publish-click')">출간하기</button>
            </div>
        </footer>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import 'easymde/dist/easymde.min.css'

const props = defineProps({
    modelValue: String,
    title: String,
    tags: String
})

const emit = defineEmits(['update:modelValue', 'update:title', 'update:tags', 'publish-click'])

const emitUpdate = (val) => emit('update:modelValue', val)

const titleSync = computed({
    get: () => props.title,
    set: (val) => emit('update:title', val)
})

const rawTagInput = ref('')
const tagList = ref([])

const tagsSync = computed({
    get: () => props.tags,
    set: (val) => emit('update:tags', val)
})

const addTag = () => {
    const trimmed = rawTagInput.value.trim()
    if (trimmed && !tagList.value.includes(trimmed)) {
        tagList.value.push(trimmed.startsWith('#') ? trimmed : `#${trimmed}`)
    }
    rawTagInput.value = ''
}

const editorOptions = {
    status: false
}
</script>

<style scoped>
.editor-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}

.editor-main {
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 2rem;
    /* 버튼과 겹치지 않도록 아래 공간 확보 */
}

.title-input {
    background-color: transparent;
    color: white;
    border: none;
    padding: 1rem 0;
    font-size: 1.8rem;
    font-weight: bold;
    width: 100%;
    outline: none;
    box-shadow: none;
    caret-color: #FF7433;
}

.tag-input {
    background-color: transparent;
    color: white;
    border: none;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    width: 100%;
    outline: none;
    box-shadow: none;
    caret-color: #FF7433;
}

.title-input::placeholder,
.tag-input::placeholder {
    color: #888;
}

.editor-footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem 1rem;
    border-top: none;
    background: transparent;
}

.btn-group {
    display: flex;
    gap: 0.5rem;
}

.action-btn,
.publish-btn {
    padding: 0.5rem 1rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 0;
}

.action-btn {
    background-color: #2a2a2a;
    color: white;
}

.publish-btn {
    background-color: #f58220;
    color: white;
}

.full-width {
    margin-left: -2rem;
    width: calc(100% + 4rem);
}

:deep(.EasyMDEContainer),
:deep(.CodeMirror),
:deep(.editor-toolbar),
:deep(.editor-preview) {
    background-color: #1e1e1e !important;
    color: white !important;
    border: none !important;
    border-radius: 6px;
}

:deep(.editor-toolbar button.active),
:deep(.editor-toolbar button.selected),
:deep(.editor-toolbar button[aria-pressed="true"]) {
    background: transparent !important;
    box-shadow: none !important;
    color: #f58220 !important;
}

:deep(.editor-toolbar button) {
    color: white !important;
}

:deep(.editor-toolbar button:hover) {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
}

:deep(.CodeMirror-cursor) {
    border-left: 1px solid white;
}

:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6),
:deep(code),
:deep(span),
:deep(mark) {
    background-color: transparent !important;
    box-shadow: none !important;
}
</style>