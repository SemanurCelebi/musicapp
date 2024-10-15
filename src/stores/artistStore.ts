import { defineStore } from 'pinia';
import axios from 'axios';
import { useKeyStore } from './keyStore'

interface artistState {
    artist: string | null;
}
export const useArtistStore = defineStore('artistStore', {
    state: (): artistState => ({
        artist: null,
    }),
    actions: {
        async getArtist() {
            const keyStore = useKeyStore();
            try {
                const response = await axios.get('https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6', {
                    headers: {
                        Authorization: `Bearer ${keyStore.token}`,
                    }
                });
                this.artist = response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
    },
});