<template>
  <button class="login-button" @click="handleClick">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '로그인'
  }
})
const emit = defineEmits(['click'])
const handleClick = () => emit('click')
</script>

<style>
.login-button {
  width: 500px;
  height: 78px;
  font-size: 32px;
  font-weight: 700;
  background-color: #fd6f22;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
}

.login-button:hover {
  background-color: white;
  color: #fd6f22;
  border: 1px solid #fd6f22;
}
</style>
