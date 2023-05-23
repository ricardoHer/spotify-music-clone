import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG, AppConfig } from "../../configuration";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class SpotifyApiService {
    /**
     *
     */
    constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) { }

    getMe(): Observable<SpotifyApi.CurrentUsersProfileResponse> { 
        return this.http.get<SpotifyApi.CurrentUsersProfileResponse>(`${this.appConfig.baseURL}/me`)
    }
}
