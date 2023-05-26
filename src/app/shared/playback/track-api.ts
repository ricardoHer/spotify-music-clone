import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../configuration";
import { HttpClient } from "@angular/common/http";
import { SpotifyApiAudioAnalysisResponse, SpotifyApiParams } from "../models";



@Injectable({ providedIn: 'root' })
export class TrackApiService {

    constructor(@Inject(APP_CONFIG) private appconfig: AppConfig, private http: HttpClient) { }

    getAudioAnalisys(trackId: string) {
        return this.http.get<SpotifyApiAudioAnalysisResponse>(`${this.appconfig.baseURL}/audio-analysis/${trackId}`);
    }

    getAudioFeatures(trackId: string) {
        return this.http.get<SpotifyApi.AudioAnalysisResponse>(`${this.appconfig.baseURL}/audio-features/${trackId}`)
    }

    getUSerSavedTracks(params: SpotifyApiParams = { limit: 50 }) {
        return this.http.get<SpotifyApi.UsersSavedTracksResponse>(`${this.appconfig.baseURL}/me/tracks`, { params });
    }
}
