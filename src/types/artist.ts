import { Image } from "@/types/image";
import { ExternalUrl } from "@/types/external_url";

export type Artist = {
    external_urls: ExternalUrl;
    followers: {
        href: string | null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Array<Image>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}