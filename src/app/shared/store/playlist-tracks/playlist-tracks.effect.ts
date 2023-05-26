import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PlaylistApiService } from "../../services/spotify-api";
import { Store, select } from "@ngrx/store";
import { getPlaylistTrackState, loadPlaylistTracks, loadPlaylistTracksSuccess, setPlaylistTracksStateStatus } from ".";
import { EMPTY } from "rxjs";
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlalistTracksEffect {

    loadPlaylistTracks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPlaylistTracks),
            withLatestFrom(this.store.pipe(select(getPlaylistTrackState))),
            tap(([{ playlistId }, playlistTracks]) => {
                if (playlistTracks.data?.has(playlistId)) {
                    this.store.dispatch(
                        setPlaylistTracksStateStatus({
                            status: 'success'
                        })
                    );
                }
            }),
            filter(([{ playlistId }, playlistTracks]) => {
                return !playlistTracks.data?.has(playlistId);
            }),
            switchMap(([{ playlistId }]) =>
                this.playlistsApi.getTracks(playlistId).pipe(
                    map((playlistTracks) =>
                        loadPlaylistTracksSuccess({
                            playlistId,
                            playlistTracks
                        })
                    ),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private playlistsApi: PlaylistApiService,
        private store: Store
    ) { }
}
