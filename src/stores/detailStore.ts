import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getArtist } from "@/services/artist";
import { Artist } from "@/types/artist";
import { useKeyStore } from "@/stores/keyStore";
import {getTrack} from "@/services/track";
import {Track} from "@/types/track";

export const useDetailStore = defineStore('detailStore', () => {
    const artist = ref<Artist>();
    const track = ref<Track>();
    const keyStore = useKeyStore();
    const token = keyStore.token;

    const getArtistData = async (artistId: string ) => {
        try {
            artist.value = await getArtist(artistId, token);
        } catch (err) {
            console.error(err);
        }
    };

    const getTrackData = async (trackId: string ) => {
        try {
            track.value = await getTrack(trackId, token);
        } catch (err) {
            console.error(err);
        }
    };

    return {
        artist,
        track,
        getArtistData,
        getTrackData
    }
        // async getTrack(trackId : string) {
        //     const keyStore = useKeyStore();
        //     try {
        //         const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        //             headers: {
        //                 Authorization: `Bearer ${keyStore.token}`,
        //             }
        //         });
        //         this.track = response.data;
        //     } catch (error) {
        //         console.error('Error fetching Artist:', error);
        //     }
        // },
        // async getAlbum(albumId : string) {
        //     const keyStore = useKeyStore();
        //     try {
        //         const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
        //             headers: {
        //                 Authorization: `Bearer ${keyStore.token}`,
        //             }
        //         });
        //         this.album = response.data;
        //     } catch (error) {
        //         console.error('Error fetching Artist:', error);
        //     }
        // },

});