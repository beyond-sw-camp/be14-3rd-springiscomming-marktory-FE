<template>
  <div v-if="modelValue">
    <!-- 블러 배경 -->
    <div class="blur-overlay"></div>

    <!-- 작성 모달 -->
    <div class="editor-popup">
      <!-- 제목 입력 -->
      <input
        v-model="title"
        class="title-input"
        type="text"
        placeholder="제목을 입력하세요"
      />
      <hr/>

      <!-- 내용 입력 -->
      <div
        class="editor-content"
        contenteditable="true"
        @input="onContentInput"
        ref="contentRef">
      </div>

      <!-- 버튼 -->
      <div class="editor-footer">
        <button class="close" @click="close">취소</button>
        <button class="submit" @click="submit">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'submitNotice'])

const title = ref('')
const content = ref('')
const contentRef = ref(null)

const onContentInput = () => {
  content.value = contentRef.value.innerHTML
}

const close = () => {
  title.value = ''
  content.value = ''
  emit('update:modelValue', false)
}

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
    emit('submitNotice', added)
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
  width: 1200px;
  height: 850px;
  background-color: rgba(30, 30, 30, 0.95);
  color: #fff;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  font-family: 'Helvetica Neue', sans-serif;
  z-index: 1001;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
}

.blur-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  z-index: 1000;
}

.title-input {
  width: 100%;
  font-size: 22px;
  padding: 12px 16px;
  border-radius: 10px;
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
  font-size: 16px;
  line-height: 1.6;
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
  font-size: 16px;
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
