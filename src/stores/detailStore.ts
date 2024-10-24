import { defineStore } from 'pinia';
import axios from 'axios';
import { useKeyStore } from './keyStore'

export interface Artist {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Array<{ url: string; height: number; width: number }>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface detailState {
    artist: Artist | null;
}
export const useDetailStore = defineStore('detailStore', {
    state: (): detailState => ({
        artist: null,
    }),
    actions: {
        async getArtist(artistId : string) {
            const keyStore = useKeyStore();
            try {
                const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
                    headers: {
                        Authorization: `Bearer ${keyStore.token}`,
                    }
                });
                this.artist = response.data;
            } catch (error) {
                console.error('Error fetching Artist:', error);
            }
        },
    },
});