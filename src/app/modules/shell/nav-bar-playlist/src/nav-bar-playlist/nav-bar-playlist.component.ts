import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getPlaylists, getPlaylistsLoading } from 'src/app/shared/store/playlist';

@Component({
  selector: 'app-nav-bar-playlist',
  templateUrl: './nav-bar-playlist.component.html',
  styleUrls: ['./nav-bar-playlist.component.scss']
})
export class NavBarPlaylistComponent {

  playlists$ = this.store.pipe(select(getPlaylists));
  isPlaylistsLoading$ = this.store.pipe(select(getPlaylistsLoading));

  constructor(private store: Store) {}
}
