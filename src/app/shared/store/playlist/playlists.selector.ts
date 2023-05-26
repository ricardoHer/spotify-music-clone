import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlaylistsState, playlistsFeatureKey } from '.';
import { SelectorUtil } from '../../utils';


export const getPlaylistsState = createFeatureSelector<PlaylistsState>(playlistsFeatureKey);
export const getPlaylists = createSelector(getPlaylistsState, (state) => state.data);
export const getPlaylistsWithRouterUrl = createSelector(getPlaylists, SelectorUtil.getPlaylistsWithroute);
export const getPlaylistsLoading = createSelector(getPlaylistsState, SelectorUtil.isLoading);
export const getPlaylistsMap = createSelector(getPlaylistsState, (state) => state.map);
export const getPlaylist = (playlistId: string) => createSelector(getPlaylistsMap, (map) => map?.get(playlistId));