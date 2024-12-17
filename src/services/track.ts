import axios from "axios";
import { Track } from "@/types/track";

export async function getTrack(
    trackId: string,
    token: string | null
): Promise<Track> {
    if (!token) {
        throw new Error("Authorization token is missing");
    }

    try {
        const response = await axios.get<Track>(
            `https://api.spotify.com/v1/tracks/${trackId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error fetching search data:", error);
        throw error;
    }
}
