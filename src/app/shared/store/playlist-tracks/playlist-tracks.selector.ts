import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlaylistTrackState, playlistTrackFeatureKey } from '.';
import { SelectorUtil } from '../../utils';


export const getPlaylistTrackState = createFeatureSelector<PlaylistTrackState>(playlistTrackFeatureKey);

export const getPlaylistTrcksLoading = createSelector(getPlaylistTrackState, SelectorUtil.isLoading);

export const getPlaylisTracksById = (playlistId: string) => createSelector(getPlaylistTrackState, ({ data }) => {return data?.get(playlistId)});