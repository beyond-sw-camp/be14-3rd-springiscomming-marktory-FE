<template>
	<div class="result-wrapper">
		<AppHeader />

		<div class="wrapper">
			<div class="scaler" :style="scaleStyle">
				<div class="result-page">
					<img src="@/assets/icons/marktory-logo.svg" alt="로고" class="logo" />
					<h1 class="title">환영합니다!</h1>
					<LoginButton text="시작하기" @click="goToLogin" />
				</div>
			</div>
		</div>

		<AppFooter />
	</div>
</template>

	
	
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/footer/AppFooter.vue'
import LoginButton from '@/components/login/LoginButton.vue'

const router = useRouter()

const goToLogin = () => {
	router.push('/login')
}

const scaleStyle = ref({})
const baseWidth = 1920
const baseHeight = 1080

const updateScale = () => {
	const scaleX = window.innerWidth / baseWidth
	const scaleY = window.innerHeight / baseHeight
	const scale = Math.min(scaleX, scaleY)
	const offsetX = (window.innerWidth - baseWidth * scale) / 2
	const offsetY = (window.innerHeight - baseHeight * scale) / 2 - 60
	scaleStyle.value = {
		transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
		transformOrigin: 'top left',
		position: 'absolute',
		width: `${baseWidth}px`,
		height: `${baseHeight}px`,
		top: 0,
		left: 0,
		zIndex: 10,
	}
}

onMounted(() => {
	updateScale()
	window.addEventListener('resize', updateScale)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateScale)
})
</script>
	
<style scoped>
.wrapper {
	width: 100vw;
	height: 80vh;
	position: relative;
	background-color: black;
	overflow: hidden;
}
.scaler {
	will-change: transform;
}

.result-page {
	width: 1920px;
	height: 1080px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40px;
	box-sizing: border-box;
	font-family: "Noto Sans KR", sans-serif;
	overflow: hidden;
}

.logo {
	width: 658px;
	margin-bottom: 24px;
	margin-top: 60px;
}

.title {
	font-size: 64px;
	font-weight: bold;
	margin-bottom: 100px;
}

</style>