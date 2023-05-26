import { createReducer, on } from "@ngrx/store";
import { GenericState } from "../../models";
import { loadPlaylistTracks, loadPlaylistTracksError, loadPlaylistTracksSuccess, setPlaylistTracksStateStatus } from ".";

export const playlistTrackFeatureKey = "playlistTracks";
export type PlaylistTrackState = GenericState<Map<string, SpotifyApi.PlaylistTrackResponse>>;

const initialState: PlaylistTrackState = {
    data: new Map(),
    status: 'pending',
    error: null
}

export const playlistTracksReducer = createReducer(
    initialState,
    on(loadPlaylistTracks, (state) => ({...state, status: 'loading'})),
    on(loadPlaylistTracksSuccess,(state, { playlistId, playlistTracks }) => {
      const { data: map } = state;
      map?.set(playlistId, playlistTracks);
      return { ...state, data: map, status: 'success' }  
    }),
    on(loadPlaylistTracksError, (state, { error }) => ({ ...state, error, status: 'error' })),
    on(setPlaylistTracksStateStatus, (state, { status }) => ({...state, status}))
)