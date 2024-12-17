import axios from "axios";
import { Artist } from "@/types/artist";

export async function getArtist(
    artistId: string,
    token: string | null
): Promise<Artist> {
    if (!token) {
        throw new Error("Authorization token is missing");
    }

    try {
        const response = await axios.get<Artist>(
            `https://api.spotify.com/v1/artists/${artistId}`,
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
