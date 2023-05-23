export interface SpotifyArtistExtended {
    name: string;
    uri: string;
    artistUrl: string;
}

export interface SpotifyTrackExtended {
    uri: string;
    id: string | null;
    type: 'track' | 'episode' | 'ad';
    media_type: 'audio' | 'video';
    name: string;
    is_playable: boolean;
    album: Album;
    albumUrl: string;
    playlistUrl: string;
    artists: SpotifyArtistExtended[];
}

interface Album {
    uri: string;
    name: string;
    images: Image[];
}

interface Image {
    height?: number | null;
    url: string;
    width?: number | null;
}