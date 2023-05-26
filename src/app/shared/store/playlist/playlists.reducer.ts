import { GenericState } from "../../models";
import { createReducer, on } from '@ngrx/store';
import { loadPlaylistsError, loadPlayListSuccess, loadPlaylists, loadPlaylistsSuccess } from '.';


export const playlistsFeatureKey = 'playlists';

export interface PlaylistsState extends GenericState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> {
    map: Map<string, SpotifyApi.PlaylistObjectSimplified> | null;
}

const initialState: PlaylistsState = {
    map: null,
    data: null,
    status: 'pending',
    error: null
}

export const playlistReducer = createReducer(
    initialState,
    on(loadPlaylists, (state) => ({ ...state, statue: 'loading' })),
    on(loadPlaylistsSuccess, (state, { playlists }) => {
        const { items } = playlists;
        const map = new Map<string, SpotifyApi.PlaylistObjectSimplified>();
        items.forEach((playlist) => map.set(playlist.id, playlist));
        return {
            ...state,
            map: map,
            data: playlists,
            status: 'success',
            error: null
        }
    }),
    on(loadPlaylistsError, (state, { error }) => ({
        ...state,
        error,
        status: 'error'
    })),
    on(loadPlayListSuccess, (state, { playlist }) => {
        state.map?.set(playlist.id, playlist);
        return {
            ...state,
            map: new Map<string, SpotifyApi.PlaylistObjectSimplified>(state.map!)
        };
    })
);
