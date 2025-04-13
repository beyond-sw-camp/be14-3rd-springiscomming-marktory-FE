<template>
    <section class="editor-wrapper">
        <input v-model="titleSync" placeholder="제목입력" class="title-input" />

        <section class="tag-input-group">
            <div class="tag-input-wrapper">
                <span v-for="(tag, index) in visibleTags" :key="index" class="tag-badge">
                    {{ tag }}
                </span>
                <input v-model="rawTagInput" class="tag-input" placeholder="태그를 입력하세요" @keyup.enter.prevent="addTag"
                    @keydown.delete="handleBackspace" />
            </div>
        </section>

        <section class="editor-main">
            <vue-easymde :model-value="modelValue" :options="editorOptions" @update:modelValue="emitUpdate" />
        </section>

        <footer class="editor-footer">
            <button class="action-btn">← 나가기</button>
            <div class="btn-group">
                <button class="action-btn">임시저장</button>
                <button class="publish-btn" @click="$emit('publish-click')">
                    출간하기
                </button>
            </div>
        </footer>
    </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import 'easymde/dist/easymde.min.css'

const props = defineProps({
    modelValue: String,
    title: String,
    tags: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits([
    'update:modelValue',
    'update:title',
    'update:tags',
    'publish-click',
])

const emitUpdate = (val) => emit('update:modelValue', val)

const titleSync = computed({
    get: () => props.title,
    set: (val) => emit('update:title', val),
})

const rawTagInput = ref('')
const tagList = ref([...props.tags ?? []])
const visibleTags = computed(() => tagList.value)

const addTag = () => {
    const trimmed = rawTagInput.value.trim()
    if (!trimmed || tagList.value.includes(trimmed)) return
    tagList.value.push(trimmed)
    rawTagInput.value = ''
}

const handleBackspace = (e) => {
    if (rawTagInput.value === '' && tagList.value.length > 0) {
        tagList.value.pop()
    }
}

watch(
    tagList,
    (newVal) => {
        emit('update:tags', newVal)
    },
    { deep: true }
)

const editorOptions = {
    status: false,
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
    margin-bottom: 0rem;
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

.tag-input-group {
    margin-bottom: 1rem;
}

.tag-input-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid transparent;
    padding: 0.25rem 0;
    min-height: 2.5rem;
}

.tag-badge {
    background-color: #f58220;
    color: #2c2c2c;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    transition: background-color 0.2s;
}

.tag-badge::before {
    content: "# ";
}

.tag-input {
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    font-size: 1rem;
    min-width: 80px;
    flex: 1;
    caret-color: #FF7433;
}

/* EasyMDE 커스텀 */
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

:deep(.CodeMirror-scroll) {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

:deep(.CodeMirror-scroll::-webkit-scrollbar) {
    display: none;
}

:deep(.CodeMirror-cursor) {
    border-left: 2px solid #FF7433 !important;
}

:deep(.EasyMDEContainer h1),
:deep(.EasyMDEContainer h2),
:deep(.EasyMDEContainer h3),
:deep(.EasyMDEContainer h4),
:deep(.EasyMDEContainer h5),
:deep(.EasyMDEContainer h6),
:deep(.EasyMDEContainer code),
:deep(.EasyMDEContainer pre),
:deep(.EasyMDEContainer mark),
:deep(.EasyMDEContainer span) {
    background-color: transparent !important;
    box-shadow: none !important;
    color: white !important;
}
</style>