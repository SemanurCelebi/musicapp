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
                const response = await axios.get('https://66a3b48344aa6370458236cc.mockapi.io/api/user');
                this.clientID = response.data[0].clientID;
                this.clientSecret = response.data[0].clientSecret;

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
