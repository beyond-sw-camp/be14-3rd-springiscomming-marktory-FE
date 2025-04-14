import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', {
    state: () => ({
        isLogined: false,
        user: null,
    }),
    actions: {
        login(userData) {
            if (userData.status === 'is_delete') {
                throw new Error('탈퇴한 회원입니다.')
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
                birthday: userData.birthday,
                image: userData.image,
                assigned_date: userData.assigned_date,
                report_count: userData.report_count,
                is_terms: userData.is_terms,
            }

            localStorage.setItem('loginTime', Date.now())
        },
        logout() {
            this.isLogined = false
            this.user = null
            localStorage.removeItem('loginTime')
        }
    },
    persist: true,
})