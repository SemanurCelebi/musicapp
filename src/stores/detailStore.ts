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

export interface Album {
    album_type: string;
    artists: Array<Artist>;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Array<{ url: string; height: number; width: number }>;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface Track {
    album: Album;
    artists: Array<Artist>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

interface detailState {
    artist: Artist | null;
    track: Track | null;
    album: Album | null;
}
export const useDetailStore = defineStore('detailStore', {
    state: (): detailState => ({
        artist: null,
        track: null,
        album: null
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
        async getTrack(trackId : string) {
            const keyStore = useKeyStore();
            try {
                const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
                    headers: {
                        Authorization: `Bearer ${keyStore.token}`,
                    }
                });
                this.track = response.data;
            } catch (error) {
                console.error('Error fetching Artist:', error);
            }
        },
        async getAlbum(albumId : string) {
            const keyStore = useKeyStore();
            try {
                const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
                    headers: {
                        Authorization: `Bearer ${keyStore.token}`,
                    }
                });
                this.album = response.data;
            } catch (error) {
                console.error('Error fetching Artist:', error);
            }
        },
    },
});