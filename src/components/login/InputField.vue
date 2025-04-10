<!-- src/components/login/InputField.vue -->
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

        <!-- 눈 아이콘: 비밀번호 타입이고 포커스 중이거나 입력값이 있으면 보임 -->
        <img
            v-if="type === 'password' && (isFocused)"
            :src="showPassword ? eyeOpen : eyeClosed"
            class="eye-icon"
            @mousedown.prevent="togglePasswordVisible"
            alt="비밀번호 보기 토글"
        />
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'

    // Props
    const props = defineProps({
    modelValue: String,
        placeholder: String,
        type: {
            type: String,
            default: 'text',
        },
    })

    // Emits
    const emit = defineEmits(['update:modelValue'])

    // 상태 관리
    const isFocused = ref(false)
    const showPassword = ref(false)

    // v-model 바인딩용 computed
    const modelValueProxy = computed({
        get: () => props.modelValue,
        set: (val) => emit('update:modelValue', val),
    })

    // 실제 input의 type 결정
    const visibleType = computed(() =>
    props.type === 'password'
        ? showPassword.value
        ? 'text'
        : 'password'
        : props.type
    )

    // blur 처리 (포커스 빠질 때)
    const handleBlur = () => {
        isFocused.value = false
    }

    // 눈 아이콘 이미지
    import eyeOpen from './eye-open.svg'
    import eyeClosed from './eye-closed.svg'

    // 토글
    const togglePasswordVisible = () => {
        showPassword.value = !showPassword.value
    }

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
        background-color: #1e1e1e;
        transition: border-color 0.2s ease;
    }

    .input-wrapper.focused {
    border-color: #fd6f22;
    }

    /* input 스타일 */
    input {
        flex: 1;
        height: 100%;
        border: none;
        outline: none;
        font-size: 24px;
        font-family: "Noto Sans KR", sans-serif;
        background: transparent;
        transition: color 0.2s ease;
        color: #ffffff; 
    }

    /* 포커스일 때 주황색 */
    .input-wrapper.focused input {
        color: #fd6f22; 
    }

    /* 설명 색깔 */
    input::placeholder {
        color: #808080;
    }

    /* 입력 시 설명 안 보이게 처리 */
    .input-wrapper.focused input:placeholder-shown {
        opacity: 0; 
    }

    /* 포커스 아니고 값도 없을 때 placeholder, 글씨 흰색 */
    .input-wrapper:not(.focused) input:placeholder-shown {
        color: #ffffff;
    }

    /* 눈 아이콘 */
    .eye-icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
        color: #fd6f22; 
    }
</style>