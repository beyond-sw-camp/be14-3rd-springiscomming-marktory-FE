<template>
  <!-- 
    로그인 버튼 컴포넌트.
    - hover 시 스타일 반전 (outlined)
    - 눌렀을 때 눌림 효과 (scale + opacity)
  -->
  <button class="login-button" @click="handleClick">
    로그인
  </button>
</template>

<script setup>
	import { ref } from 'vue'

	// 클릭 여부 상태 (현재는 스타일에는 반영되지 않지만 예시용으로 유지)
	const isClicked = ref(false)

	// 부모 컴포넌트로 click 이벤트 전달
	const emit = defineEmits(['click'])

	const handleClick = () => {
		isClicked.value = !isClicked.value
		emit('click')
	}
</script>

<style scoped>
	/* 공통 스타일 */
	.login-button {
		width: 100%;
		max-width: 500px;
		height: 78px;
		border-radius: 10px;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
		font-family: "Noto Sans KR", sans-serif;
		font-size: 32px;
		font-weight: 700;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;

		background-color: #fd6f22; /* 기본 주황색 */
		color: #ffffff;
	}

	/* hover 시: 테두리 생기고 색 반전 (== outlined 스타일 느낌) */
	.login-button:hover {
		background-color: #ffffff;
		color: #fd6f22;
		border: 1px solid #fd6f22;
	}

	/* 눌렀을 때: 눌림 효과 */
	.login-button:active {
		/* transform: scale(0.97); */
		opacity: 0.5;
	}
</style>
