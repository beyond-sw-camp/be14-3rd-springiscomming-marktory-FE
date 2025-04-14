<template>
  <div class="editor-popup" v-if="modelValue" >
    <div class="header">
      <input
        v-model="editedTitle"
        class="title-input"
        type="text"
        placeholder="제목을 입력하세요"
      />
    </div>

    <div class="editor-toolbar">
      <span>H1</span><span>H2</span><span>H3</span><span>H4</span>
      <span class="divider" />
      <span><b>B</b></span> 
      <span><i>I</i></span>
      <span>🟰</span>
      <span>❝❞</span>
      <span>🖼️</span>
      <span>🔗</span>
      <span>&lt;/&gt;</span>
    </div>

    <div
      class="editor-content"
      contenteditable="true"
      @input="onContentInput"
      ref="contentRef"
    >{{ editedContent }}</div>

    <div class="editor-footer">
      <button class="close" @click="close">나가기</button>
      <button class="submit" @click="submit">등록하기</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  notice: Object,
})

const emit = defineEmits(['update:modelValue', 'submit'])

// 로컬 상태 (제목, 내용 복사해서 수정)
const editedTitle = ref('')
const editedContent = ref('')
const contentRef = ref(null)

onMounted(() => {
  editedTitle.value = props.notice.title
  editedContent.value = props.notice.content
})

// contenteditable에서 타이핑 감지
const onContentInput = () => {
  editedContent.value = contentRef.value.innerHTML
}

// 모달 닫기
const close = () => {
  emit('update:modelValue', false)
}

// 등록 버튼 클릭 시
const submit = () => {
  emit('submit', {
    title: editedTitle.value,
    content: editedContent.value,
  })
  close()
}
</script>

<style scoped>
.editor-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 850px;
  height: 595px;
  background-color: #1e1e1e;
  color: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', sans-serif;
  z-index: 1000;
}

.title-input {
  width: 100%;
  font-size: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #2a2a2a;
  color: #fff;
  font-weight: bold;
}

.header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #aaa;
}

.editor-toolbar {
  display: flex;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #444;
  font-size: 14px;
  align-items: center;
}

.editor-toolbar span {
  cursor: pointer;
  color: #ccc;
}

.divider {
  width: 1px;
  height: 16px;
  background-color: #666;
  margin: 0 8px;
}

.editor-content {
  flex-grow: 1;
  padding: 16px 0;
  color: #ccc;
  outline: none;
  overflow-y: auto;
}

.editor-footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  border-top: 1px solid #444;
  padding-top: 16px;
}

button {
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close {
  background-color: #2c2c2c;
  color: #ccc;
  transition: background-color 0.3s, color 0.3s;
}

.close:hover {
  background-color: #ccc;
  color: #2c2c2c;
}

.submit {
  background-color: #FD6F22;
  color: #fff;
  transition: background-color 0.3s, color 0.3s;
}

.submit:hover{
  background-color: #fff;
  color: #FD6F22;
}
</style>
