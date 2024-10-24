import { defineStore } from 'pinia';
import axios from 'axios';

interface KeyState {
    clientID: string | null;
    clientSecret: string | null;
    token: string | null;
}

export const useKeyStore = defineStore('keyStore', {
    state: (): KeyState => ({
        clientID: null,
        clientSecret: null,
        token : null
    }),
    actions: {
        async getKey(): Promise<void> {
            try {
                const response = await axios.get('https://run.mocky.io/v3/28375f13-c42d-46f9-ac25-ef8fc8f224c7');
                this.clientID = response.data.clientID;
                this.clientSecret = response.data.clientSecret;

                const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
                    grant_type: 'client_credentials',
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`), // Basic auth header
                    },
                });
                this.token = tokenResponse.data.access_token;
            } catch (error) {
                console.error('Error fetching key:', error);
                throw error;
            }
        },
    },
});
