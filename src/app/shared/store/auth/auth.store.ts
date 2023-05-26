// Magic line, whitout this would case the build to fail
///  <reference types="spotify-api" />

import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ComponentStore } from '@ngrx/component-store';
import { SpotifyApiService } from "../../services/spotify-api";
import { Observable } from 'rxjs';
import { filter, map, switchMapTo, tap, catchError } from 'rxjs/operators';
import { SpotifyAuthorize } from "../../services/auth";
import { Store } from "@ngrx/store";
import { AuthReady } from "../../app-init";


export interface AuthState extends SpotifyApi.CurrentUsersProfileResponse {
    accessToken: string | null;
    tokenType: string | null;
    expiresIn: number;
    state: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private spotifyService: SpotifyApiService,
        private store: Store
    ) {
        super(<AuthState>{});
    }


    // read only propeties
    // getting the token
    readonly token$ = this.select((s) => s.accessToken).pipe(
        filter((token) => !!token)
    ) as Observable<string>
    // getting the country
    readonly country$ = this.select((s) => s.country)
    // getting the user name
    readonly userName$ = this.select((s) => s.display_name)
    // getting the spotify product
    readonly userProduct$ = this.select((s) => s.product)
    readonly userAvatar$ = this.select((s) => (s.images && s.images[0]?.url) || 'https://avatars.githubusercontent.com/u/20401129?s=200&v=4')
    // user id
    readonly getUserId = () => this.get().id;
    // user token
    readonly getToken = () => this.get().accessToken;
    // return the seeted user and current state
    readonly setCurrentUser = this.updater((state, user: SpotifyApi.CurrentUsersProfileResponse) => {
        return {
            ...state,
            ...user
        }
    })

    // Initiate the store
    readonly init = this.effect((params$) => params$.pipe(switchMapTo(this.initAuth())));

    // this functionality redirect to spotify api authentication to generate the token
    redirectToAuthorize() {
        const spotifyAuthorize = new SpotifyAuthorize();
        // redirects the application to the spotify app to authorize
        const url = spotifyAuthorize.createAuthorizeURL()
        window.location.href = url;
    }

    // init the auth
    private initAuth() {
        if (!window.location.hash) {
            this.redirectToAuthorize();
        }

        // getting the posted response 
        return this.route.fragment.pipe(
            filter((fragment) => !!fragment),
            map((fragment) => new URLSearchParams(fragment as string)),
            map((params) => ({
                accessToken: params.get('access_token'),
                tokenType: params.get('token_type'),
                expiresIn: Number(params.get('expires_in')),
                state: params.get('state')
            }
            )),
            tap((params) => {
                this.patchState(params);
                this.store.dispatch(AuthReady())
                console.info(`Application authenticated`)
            }),
            tap(() => {
                this.setCurrentUser(this.spotifyService.getMe());
                this.router.navigate(['/home']);
            })
        );
    }

}