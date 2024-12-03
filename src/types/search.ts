import { Artist } from "@/types/artist";
import { Album} from "@/types/album";
import { Playlist } from "@/types/playlist";
import { Track } from "@/types/track";

export interface SearchResponse {
    artists: { items: Artist[] };
    albums: { items: Album[] };
    playlists: { items: Playlist[] };
    tracks: { items: Track[] };
}