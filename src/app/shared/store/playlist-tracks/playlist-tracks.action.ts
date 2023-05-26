import { createAction, props } from '@ngrx/store';
import { GenericStoreStatus } from '../../models';


const playlistTrackLoadSuccess = '[Playlist Tracks/Load Success]';
const playlistTrackLoadError = '[Playlist Tracks/Load Error]';
const playlistTrackSuccess = '[Playlist Tracks/Load Success]';
const playlistTrackStateStatus = '[Playlist Tracks/Set Playlist Tracks Status]';


export const loadPlaylistTracks = createAction(
    playlistTrackLoadSuccess,
    props<{ playlistId: string }>()
)

export const loadPlaylistTracksError = createAction(playlistTrackLoadError, props<{ error: string }>());

export const loadPlaylistTracksSuccess = createAction(playlistTrackSuccess,
    props<{ playlistId: string; playlistTracks: SpotifyApi.PlaylistTrackResponse }>()
);

export const setPlaylistTracksStateStatus = createAction(playlistTrackStateStatus,
    props<{ status: GenericStoreStatus }>()
);

