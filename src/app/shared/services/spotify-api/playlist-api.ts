import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../../configuration";
import { SpotifyApiParams } from "../../models";

@Injectable({ providedIn: 'root' })
export class PlaylistApiService {
    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) { }

    getUserSavedPlaylists(
        params: SpotifyApiParams = { limit: 50 }
    ) {
        return this.http.get<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(`${this.appConfig.baseURL}/me/playlists`, { params })
    }

    getById(playListId: string) {
        if (!playListId) {
            throw new Error('Playlist Id is required');
        }
        return this.http.get<SpotifyApi.PlaylistObjectFull>(`${this.appConfig}/playlists/${playListId}`);
    }

    getTracks(playListId: string) {
        if(!playListId) {
            throw new Error('Playlist Id is required');
        }
        return this.http.get<SpotifyApi.PlaylistTrackResponse>(`${this.appConfig.baseURL}/playlists/${playListId}/tracks`);
    }
}