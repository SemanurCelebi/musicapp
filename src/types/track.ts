import { Artist } from '@/types/artist'
import { Album } from "@/types/album";
import { ExternalUrl } from "@/types/external_url";

export type Track = {
    album: Album;
    artists: Array<Artist>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
    };
    external_urls: ExternalUrl;
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