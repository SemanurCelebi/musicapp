import axios from "axios";
import { SearchResponse } from "@/types/search";

export async function searchSpotify(
    query: string,
    token: string
): Promise<SearchResponse> {
    try {
        const response = await axios.get<SearchResponse>(
            `https://api.spotify.com/v1/search?q=${query}&type=artist,track,album,playlist`,
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
