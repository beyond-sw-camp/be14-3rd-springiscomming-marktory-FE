<template>
  <div class="editor-popup" v-if="modelValue">
    <!-- 제목 입력 -->
    <input
      v-model="title"
      class="title-input"
      type="text"
      placeholder="제목을 입력하세요"
    />

    <!-- 툴바 (시각적 요소용) -->
    <div class="editor-toolbar">
      <span>H1</span><span>H2</span><span>H3</span><span>H4</span>
      <span class="divider" />
      <span><b>B</b></span><span><i>I</i></span>
      <span>🟰</span><span>❝❞</span><span>🖼️</span><span>🔗</span><span>&lt;/&gt;</span>
    </div>

    <!-- 내용 입력 -->
    <div
      class="editor-content"
      contenteditable="true"
      @input="onContentInput"
      ref="contentRef"
    ></div>

    <!-- 버튼 -->
    <div class="editor-footer">
      <button class="close" @click="close">취소</button>
      <button class="submit" @click="submit">등록하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// props & emits
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'submit'])

// 상태
const title = ref('')
const content = ref('')
const contentRef = ref(null)

// 입력 감지
const onContentInput = () => {
  content.value = contentRef.value.innerHTML
}

// 모달 닫기 및 초기화
const close = () => {
  title.value = ''
  content.value = ''
  emit('update:modelValue', false) // 부모에서 모달 닫히도록
}

// 등록 처리 → JSON 서버에 POST 요청
const submit = async () => {
  const newNotice = {
    title: title.value,
    content: content.value,
    date: new Date().toISOString().split('T')[0],
    writer: '김민준 관리자'
  }

  try {
    const res = await fetch('http://localhost:3001/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNotice)
    })

    if (!res.ok) throw new Error('등록 실패')

    const added = await res.json()
    emit('submit', added) // 부모 컴포넌트로 새 항목 전달
    close()
  } catch (err) {
    console.error('공지사항 등록 실패:', err)
    alert('공지사항 등록에 실패했습니다.')
  }
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
  margin-top: 24px;
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
}

.close:hover {
  background-color: #ccc;
  color: #2c2c2c;
}

.submit {
  background-color: #FD6F22;
  color: #fff;
}

.submit:hover {
  background-color: #fff;
  color: #FD6F22;
}
</style>
