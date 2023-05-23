
// Referece to playback types
/// <reference types="spotify-web-playback-sdk" />

import { Injectable } from "@angular/core";
import { GenericState, SpotifyApiAudioAnalysisResponse, SpotifyTrackExtended, StringUtil } from "../models";
import { ComponentStore } from "@ngrx/component-store";
import { filter, map, Observable } from 'rxjs';
import { RouteUtil } from "../models/route-util";

interface PlaybackState extends GenericState<Spotify.PlaybackState> {
    playser: Spotify.Player;
    deviceId: string;
    volume: number;
    analysis: SpotifyApiAudioAnalysisResponse;
    trackAnalysisId: string;
    isAnalysisLoading: boolean
}



@Injectable({ providedIn: 'root' })
export class PlaybackStore extends ComponentStore<PlaybackState> {

    readonly playback$ = this.select((s) => s.data)
        .pipe(
            filter((data) => !!data)
        ) as Observable<Spotify.PlaybackState>

    readonly context$ = this.playback$.pipe(map((data) => data.context));
    readonly currentTrack$: Observable<SpotifyTrackExtended | null> = this.playback$.pipe(
        filter((data) => !!data),
        map(({ context, track_window }) => {
            const track = track_window.current_track;
            if (!track) {
                return null;
            }
            const { album } = track;
            const getPlaylistUrl = (uri: string | null) => {
                if (!uri) {
                    return '';
                }
                const isPlaylist = uri.includes('playlist');
                return isPlaylist ? RouteUtil.getPlaylistRouteUrl(StringUtil.getIdFromUri(uri)) : ''
            }
            const albumId = StringUtil.getIdFromUri(album.uri);
            const albumUrl = RouteUtil.getAlbumRouteUrl(albumId);
            const trackExtended: SpotifyTrackExtended = {
                ...track,
                albumUrl,
                playlistUrl: getPlaylistUrl(context.uri),
                artists: track.artists.map((artist) => {
                    const artistId = StringUtil.getIdFromUri(artist.uri);
                    const artistUrl = RouteUtil.getAlbumRouteUrl(artistId);
                    return {
                        ...artist,
                        artistUrl
                    };
                }),
            };
            return trackExtended;
        })
    );
    readonly position$ = this.playback$.pipe(map((data) => data?.position));
    readonly volume$ = this.select((x) => x.volume);
    readonly isPlaying$ = this.playback$.pipe(
        map((data) => {
            if (!data) {
                return false
            }
            return !data.paused;
        }))
}
