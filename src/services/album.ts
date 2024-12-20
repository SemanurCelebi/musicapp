import axios from "axios";
import { Album } from "@/types/album";

export async function getAlbum(
    albumId: string,
    token: string | null
): Promise<Album> {
    if (!token) {
        throw new Error("Authorization token is missing");
    }

    try {
        const response = await axios.get<Album>(
            `https://api.spotify.com/v1/albums/${albumId}`,
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
