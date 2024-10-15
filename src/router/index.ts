import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/components/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
];

const router = createRouter({
    history: createWebHistory('/musicapp/'),
    routes
});

export default router;
