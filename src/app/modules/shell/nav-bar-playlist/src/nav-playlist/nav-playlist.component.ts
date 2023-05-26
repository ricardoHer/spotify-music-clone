import { Component, Input, OnInit } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { PlaybackStore } from 'src/app/shared/playback';
import { PlayerApiService } from 'src/app/shared/services/spotify-api';
import { RouteUtil, SelectorUtil } from 'src/app/shared/utils';

@Component({
  selector: 'app-nav-playlist',
  templateUrl: './nav-playlist.component.html',
  styleUrls: ['./nav-playlist.component.scss']
})
export class NavPlaylistComponent implements OnInit {
  @Input()
  set playlist(value: SpotifyApi.PlaylistObjectSimplified) {
    this.playlistWithRoute = { ...value, routeUrl: RouteUtil.getPlaylistRouteUrl(value.id) };
  }
  
  playlistWithRoute!: SpotifyApi.PlaylistObjectSimplified & { routeUrl: string };
  isPlaylistPlaying$!: Observable<boolean>;

  togglePlaylist(isPlaying: boolean) {
    this.playerApi.togglePlay(isPlaying, { context_uri: this.playlistWithRoute?.uri });
  }

  constructor(private playbackStore: PlaybackStore, private playerApi: PlayerApiService) {}

  ngOnInit(): void { 
    this.isPlaylistPlaying$ = SelectorUtil.getMediaPlayingState(
      combineLatest([of(this.playlistWithRoute?.uri), this.playbackStore.playback$])
    );
  }


}
