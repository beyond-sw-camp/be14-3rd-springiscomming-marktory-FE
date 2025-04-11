<template>
  <div :class="['input-wrapper', { focused: isFocused }]">
    <input
      :type="visibleType"
      :placeholder="placeholder"
      v-model="modelValueProxy"
      @focus="isFocused = true"
      @blur="handleBlur"
      :autocomplete="type === 'password' ? 'current-password' : 'on'"
    />
    <img
      v-if="type === 'password' && isFocused"
      :src="showPassword ? eyeOpen : eyeClosed"
      class="eye-icon"
      @mousedown.prevent="togglePasswordVisible"
      alt="비밀번호 보기 토글"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import eyeOpen from './eye-open.svg'
import eyeClosed from './eye-closed.svg'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)
const showPassword = ref(false)

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const visibleType = computed(() =>
  props.type === 'password'
    ? showPassword.value
      ? 'text'
      : 'password'
    : props.type
)

const handleBlur = () => {
  isFocused.value = false
}

const togglePasswordVisible = () => {
  showPassword.value = !showPassword.value
}
</script>

<style>
.input-wrapper {
  position: relative;
  width: 500px;
  height: 80px;
  border: 2px solid #ffffff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: #1e1e1e;
  transition: border-color 0.2s ease;
}

.input-wrapper.focused {
  border-color: #fd6f22;
}

.input-wrapper input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 24px;
  font-family: "Noto Sans KR", sans-serif;
  background: transparent;
  color: #ffffff;
  transition: color 0.2s ease;
}

.input-wrapper.focused input {
  color: #fd6f22;
}

input::placeholder {
  color: #808080;
}

.eye-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
