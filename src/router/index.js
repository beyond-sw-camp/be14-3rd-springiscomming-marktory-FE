import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/HomePage.vue')
        },
        {
            path: '/article/:id',
            name: 'ArticlePage',
            component: () => import('@/pages/ArticlePage.vue')
        },
        {
            path: '/login',
            component: () => import('@/pages/LoginPage.vue')
        },
        {
            path: '/findid',
            component: () => import('@/pages/FindIdPage.vue')
        },
        {
            path: '/signup',
            component: () => import('@/pages/SignupPage.vue')
        },
        {
            path: '/presignup',
            component: () => import('@/pages/PreSignupPage.vue')
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
        },
        {
            path: '/categorypage',
            component: () => import('../pages/CategoryPage.vue')
        },
        {
            path: '/adminPage',
            component: () => import('../pages/AdminPage.vue'),
            children: [
                {
                    path: 'notice', 
                    component: () => import('../components/admin/NoticeAdmin.vue')
                }

            ]},
            {
                path: '/adminPage/notice/:id',
                component: () => import('../components/admin/NoticeContentPage.vue')

        },
        {
            path: '/findid/result',
            component: () => import('@/pages/FindIdResultPage.vue')
        },
        {
            path: '/signup/result',
            component: () => import('@/pages/SignupResultPage.vue')
        },
        {
            path: '/setting',
            component: () => import('../pages/SettingPage.vue')
        },
        {
            path: '/activity',
            component: () => import('../pages/ActivityPage.vue'),
            children: [
                {
                    path: '/activity',
                    redirect: '/activity/post'
                },
                {
                    path: 'post',
                    component: () => import('../components/activity/LikedPostCardList.vue')
                },
                {
                    path: 'likecomment',
                    component: () => import('../components/activity/LikedCmtCardList.vue')
                },
                {
                    path: 'writecomment',
                    component: () => import('../components/activity/WrittenCmtCardList.vue')
                }
            ]
        },
        {
            path: '/prefindpw',
            component: () => import('../pages/PreFindPwPage.vue')
        },
        {
            path: '/findpw',
            component: () => import('../pages/FindPwPage.vue')
        }
    ]
});

export default router