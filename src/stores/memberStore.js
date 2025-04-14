import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', {
    state: () => ({
        isLogined: false,
        user: null,
    }),
    actions: {
        login(userData) {
            if (userData.status === 'is_delete') {
                throw new Error('회원 정보가 존재하지 않습니다. 새롭게 가입해주십시오')
            }
            if (userData.black_date !== null) {
                throw new Error('블랙리스트 계정입니다.')
            }

            this.isLogined = true
            this.user = {
                id: userData.id,
                email: userData.email.trim(),
                name: userData.name,
                nickname: userData.nickname,
                role: userData.role
            }

            const loginTime = new Date().toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul'
            });
            localStorage.setItem('loginTime', loginTime);
        },
        logout() {
            this.isLogined = false
            this.user = null
            localStorage.removeItem('loginTime')
        },

        /* 자동 로그아웃 함수 생성 */
        checkLoginExpired() {
            const loginTime = localStorage.getItem('loginTime')
            const expireTime = 1000 * 60 * 60 // 60분 (1시간)

            if (loginTime && Date.now() - Number(loginTime) > expireTime) {
                this.logout()
                return true // 만료됨
            }
            return false // 아직 유효함
        }
    },
    persist: true,
})