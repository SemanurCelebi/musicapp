import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import ArtistDetail  from "@/components/ArtistDetail.vue";
import TracksDetail from "@/components/TrackDetail.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/artistDetail/:artistId',
        name: 'ArtistDetail',
        component: ArtistDetail,
        props: true
    },
    {
        path: '/trackDetail/:trackId',
        name: 'TracksDetail',
        component: TracksDetail,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory('/musicapp/'),
    routes
});

export default router;
