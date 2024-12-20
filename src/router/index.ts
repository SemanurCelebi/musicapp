import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import ArtistDetail  from "@/components/ArtistDetail.vue";
import TrackDetail from "@/components/TrackDetail.vue";
import AlbumDetail from "@/components/AlbumDetail.vue";
import PlaylistDetail from "@/components/PlaylistDetail.vue";

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
        name: 'TrackDetail',
        component: TrackDetail,
        props: true
    },
    {
        path: '/albumDetail/:albumId',
        name: 'AlbumDetail',
        component: AlbumDetail,
        props: true
    },
    {
        path: '/playlistDetail/:playlistId',
        name: 'PlaylistDetail',
        component: PlaylistDetail,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory('/musicapp/'),
    routes
});

export default router;
