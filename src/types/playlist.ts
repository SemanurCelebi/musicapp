import { Image } from "@/types/image";
import { ExternalUrl } from "@/types/external_url";

export type Playlist = {
    description: string;
    external_urls: ExternalUrl;
    href: string;
    id: string;
    images: Array<Image>;
    name: string;
    type: string;
    uri: string;
    owner: {
        display_name: string;
        href: string
        id: string
        type: string,
        external_urls: ExternalUrl;
    }
}