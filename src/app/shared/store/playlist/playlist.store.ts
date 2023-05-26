///  <reference types="spotify-api" />

import { Injectable } from "@angular/core";
import { GenericState } from "../../models";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, filter, map, tap, withLatestFrom } from 'rxjs';
import { PlayerApiService, PlaylistApiService } from "../../services/spotify-api";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { PlaybackStore } from "../../playback/playback.store";
import { RouteUtil, SelectorUtil } from "../../utils";
import { getPlaylisTracksById, getPlaylistTrcksLoading, loadPlaylistTracks } from "../playlist-tracks";
import { getPlaylist, getPlaylistsState, loadPlayListSuccess } from ".";
import { switchMap } from 'rxjs/operators';

interface Playliststate extends GenericState<SpotifyApi.PlaylistObjectFull> {
    playlistId: string;
}

type TogglePlayListParams = {
    isPlaying: boolean;
}

type PlayTrackParams = {
    position: number;
}


@Injectable({ providedIn: 'root' })
export class PlaylistStore extends ComponentStore<Playliststate> {

    playlistParams$: Observable<string> = this.route.params.pipe(
        map((params) => params["playlistId"]),
        filter((playlistid: string) => !!playlistid)
    )

    isCurrentplaylistLoading$ = this.select(SelectorUtil.isLoading);
    isPlaylistTrackLoading$ = this.store.select(getPlaylistTrcksLoading);

    playlist$ = this.playlistParams$.pipe(
        tap((playlistId) => {
            this.patchState({ playlistId });
            this.loadPlaylist({ playlistId });
        }),
        switchMap((playlistId) => this.store.pipe(select(getPlaylist(playlistId))))
    );

    tracks$ = this.playlistParams$.pipe(
        tap((playlistId) => {
            this.store.dispatch(loadPlaylistTracks({ playlistId }));
        }),
        switchMap((playlistId) => this.store.pipe(select(getPlaylisTracksById(playlistId))))
    );

    readonly loadPlaylist = this.effect<{ playlistId: string }>(params$ =>
        params$.pipe(
            withLatestFrom(this.store.select(getPlaylistsState)),
            filter(([params, state]) => !state.map?.get(params.playlistId)),
            tap(() => {
                this.patchState({
                    status: 'loading',
                    error: null
                });
            }),
            map(([params]) => params),
            switchMap(({ playlistId }) =>
                this.playlistApi.getById(playlistId).pipe(
                    tapResponse((playlist) => {
                        this.store.dispatch(loadPlayListSuccess({ playlist }));
                        this.patchState({
                            status: 'success',
                            error: null
                        });
                    }, (e) => {
                        this.patchState({
                            status: 'error',
                            error: e as unknown as string
                        });
                    })
                )
            )
        )
    );

    readonly togglePlaylist = this.effect<TogglePlayListParams>((params$) => params$.pipe(
        switchMap(({ isPlaying }) => this.playerApi.togglePlay(isPlaying, { context_uri: this.playlistContextUri }))
    ));

    readonly playTrack = this.effect<PlayTrackParams>((params$) => params$.pipe(
        switchMap(({ position }) =>
            this.playerApi.play({ context_uri: this.playlistContextUri, offset: { position } })
        )
    ));

    readonly playlistId$ = this.select((s) => s.playlistId);

    get playlistContextUri() {
        return RouteUtil.getPlaylistContextUri(this.get().playlistId);
    };

    constructor(
        private playerApi: PlayerApiService,
        private playlistApi: PlaylistApiService,
        private route: ActivatedRoute,
        private store: Store,
        private playbackStore: PlaybackStore
    ) {
        super({
            data: null,
            error: null,
            status: 'pending',
            playlistId: ''
        })
    }
}
