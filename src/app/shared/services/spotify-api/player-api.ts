import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG } from "../../configuration";
import { AppConfig } from "../../configuration";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { SpotifyApiRecentPlayerTracksResponse, SpotifyPlayRequestApi } from "../../models";

@Injectable({ providedIn: 'root' })
export class PlayerApiService {
    playerUrl: string;

    constructor(
        @Inject(APP_CONFIG) private appConfig: AppConfig,
        private http: HttpClient) {
        this.playerUrl = `${this.appConfig.baseURL}/me/player`
    }

    transferUSerPlayback(deviceId: string) {
        return this.http.put(this.playerUrl, {
            device_ids: [deviceId],
            play: true
        })
    }

    play(request: SpotifyPlayRequestApi) {
        return this.http.put(`${this.playerUrl}/play`, request);
    }

    pause() {
        return this.http.put(`${this.playerUrl}/pause`, {})
    }

    togglePlay(isPlaying: boolean, request: SpotifyPlayRequestApi) {
        if (isPlaying) {
            return this.pause();
        }
        return this.play(request);
    }

    next() {
        return this.http.post(`${this.playerUrl}/next`, {})
    }

    prev() {
        return this.http.post(`${this.playerUrl}/previous`, {})
    }

    seek(positionMs: number) {
        return this.http.put(`${this.playerUrl}/seek`, null, {
            params: {
                position_ms: `${positionMs}`
            }
        })
    }

    setVolume(volume: number) {
        return this.http.put(`${this.playerUrl}/volume`, null, {
            params: {
                volume_percent: `${volume}`
            }
        })
    }

    getRecentPlayedTRack(params: SpotifyApi.RecentlyPlayedParameterObject = { limit: 50 }) {
        return this.http.get<SpotifyApiRecentPlayerTracksResponse>(
            `${this.playerUrl}/recently-played`,
            {
                params: params as any
            }
        )
    }


}