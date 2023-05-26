/// <reference types="spotify-web-playback-sdk" />

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { GenericState, PlaylistsResponseWithRoute } from "../models";
import { RouteUtil } from './index'

export class SelectorUtil {
    static getMediaPlayingState(obs$: Observable<[string | undefined, Spotify.PlaybackState]>) {
        return obs$.pipe(
            map(([uri, playback]) => {
                const hasContextUri = !!playback.context?.uri;
                const hasTrackPlaying = !!playback.track_window.current_track;
                if (hasContextUri) {
                    const isCurrentPlaylistInContext = uri === playback.context?.uri;
                    if (isCurrentPlaylistInContext) {
                        return !playback.paused;
                    }
                } else if (hasTrackPlaying) {
                    const isCurrentTrackPlaying = uri === playback.track_window.current_track.uri;
                    if (isCurrentTrackPlaying) {
                        return !playback.paused
                    }
                }

                return false;
            }),
            startWith(false)
        )
    }

    static getTrackPlayingState(obs$: Observable<[string | undefined, Spotify.PlaybackState]>) {
        return obs$.pipe(
            map(([trackId, playback]) => {
                const track = playback?.track_window?.current_track;
                if (!trackId || !track) {
                    return false
                }
                if (trackId != track.id) {
                    return false;
                }
                return !playback.paused
            }), startWith(false)
        )
    }

    static isLoading({ status }: GenericState<unknown>) {
        return status === 'loading';
    }

    static isDone({ status }: GenericState<unknown>) {
        return status === 'success' || status === 'error';
    }

    static getPlaylistsWithroute(playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse | null | undefined): PlaylistsResponseWithRoute | null | undefined {
        if (playlists) {
            return {
                ...playlists,
                items: playlists.items.map((item) => ({
                    ...item,
                    routeUrl: RouteUtil.getPlaylistRouteUrl(item.id)
                }))
            }
        }
        return playlists;
    }
}