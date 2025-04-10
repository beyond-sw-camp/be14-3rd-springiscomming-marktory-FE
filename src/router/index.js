import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../pages/HomePage.vue')
        },
        {
            path: '/article',
            component: () => import('../pages/ArticlePage.vue')
        },
    ],
});

export default router
