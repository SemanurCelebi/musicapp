import axios from "axios";
import { Playlist } from "@/types/playlist";

export async function getPlaylist(
    playlistId: string,
    token: string | null
): Promise<Playlist> {
    if (!token) {
        throw new Error("Authorization token is missing");
    }

    try {
        const response = await axios.get<Playlist>(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error fetching data", error);
        throw error;
    }
}
