import { createAction, props } from '@ngrx/store';

const playlistsStoreApi = '[Playlists Store/API]';
const playlistsStoreApiSuccess = '[Playlists Store/API success]';
const playlistsStoreApiError = '[Playlists Store/API error]';
const playlistsStoreApiByIdSuccess = '[Playlists Store/Load Playlist By Id success]'

export const loadPlaylists = createAction(playlistsStoreApi);

export const loadPlaylistsSuccess = createAction(playlistsStoreApiSuccess, props<{ playlists: SpotifyApi.ListOfUsersPlaylistsResponse; }>());

export const loadPlaylistsError = createAction(playlistsStoreApiError, props<{ error: string }>());

export const loadPlayListSuccess = createAction(playlistsStoreApiByIdSuccess, props<{ playlist: SpotifyApi.PlaylistObjectSimplified; }>());