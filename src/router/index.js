import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/HomePage.vue')
        },
        {
            path: '/article',
            component: () => import('@/pages/ArticlePage.vue')
        },
        {
            path: '/login',
            component: () => import('../pages/LoginPage.vue')
        },
        {
            path: '/findid',
            component: () => import('../pages/FindIdPage.vue')
        },
        {
            path: '/signup',
            component: () => import('../pages/SignupPage.vue')
        },
        {
            path: '/presignup',
            component: () => import('../pages/PreSignupPage.vue')
        },
        {
            path: '/mypage',
            component: () => import('../pages/MyPage.vue'),
            children: [
                {
                    path: '/mypage',
                    redirect: '/mypage/post'
                },
                {
                    path: 'post',
                    component: () => import('../components/mypage/PostCardList.vue')
                },
                {
                    path: 'temp',
                    component: () => import('../components/mypage/TempCardList.vue')
                }
            ]
        },
        {
            path: '/editor',
            component: () => import('@/pages/EditorPage.vue')
        }
    ],
});

export default router