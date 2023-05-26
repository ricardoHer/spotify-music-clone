import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthStore } from "../store/auth/auth.store";
import { PlaybackService } from "../playback";
import { AppInit } from "./app-initiation";
import { tap } from "rxjs";

@Injectable()
export class ApplicationEffects {
   
    constructor(
        private action$: Actions,
        private authStore: AuthStore,
        // private playbackService: PlaybackService
    ) { }

    inithAut$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(AppInit),
                tap(() => {
                    this.authStore.init();
                })
            ),
        { dispatch: false }
    )
}
