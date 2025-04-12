<!-- components/BirthDateField.vue -->
<template>
    <div class="input-wrapper" :class="{ focused: isFocused }">
      <DatePicker
        v-model:value="modelValueProxy"
        type="date"
        format="YYYY-MM-DD"
        :input-attr="{
          readonly: true,
          placeholder: '생년월일 선택',
          class: 'datepicker-input'
        }"
        @focus="isFocused = true"
        @close="isFocused = false"
        />
    </div>
</template>
  
<script setup>
  import { ref, computed } from 'vue'
  import DatePicker from 'vue-datepicker-next'
  import 'vue-datepicker-next/index.css'
  
  const props = defineProps({
    modelValue: String,
    placeholder: String,
  })
  const emit = defineEmits(['update:modelValue'])
  
  const isFocused = ref(false)
  
  const modelValueProxy = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val),
  })
 </script>
  
<style scoped>
  .input-wrapper {
    position: relative;
    width: 500px;
    height: 80px;
    border: 2px solid #ffffff;
    padding: 0 20px;
    display: flex;
    align-items: center;
    transition: border-color 0.2s ease;
    background: transparent;
    box-sizing: border-box;
  }
  
  .input-wrapper.focused {
    border-color: #fd6f22;
  }
  
  .datepicker-input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    font-size: 24px;
    font-family: "Noto Sans KR", sans-serif;
    background: transparent;
    color: #ffffff;
    caret-color: #ffffff;
  }
  
  .datepicker-input::placeholder {
    color: #808080;
  }

</style>
  

<!-- BirthDateField.vue -->
<style>
/* App.vue or BirthDateField.vue의 전역 style 블록에 */
    .mx-datepicker-main {
    background-color: #1a1a1a !important;
    color: white !important;
    border: 1px solid #fd6f22 !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .cell.active {
    background-color: #fd6f22 !important;
    color: white !important;
    }

    .mx-btn {
    background: none !important;
    color: white !important;
    }

    .mx-calendar-header-label button {
    color: white !important;
    }

</style>