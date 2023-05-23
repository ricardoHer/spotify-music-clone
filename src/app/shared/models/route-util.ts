import { RouterUtil } from './router-utils';

export class RouteUtil {
  static getAlbumRouteUrl(albumId: string) {
    return `/${RouterUtil.Configuration.Albums}/${albumId}`;
  }
  static getArtistRouteUrl(artistId: string) {
    return `/${RouterUtil.Configuration.Artist}/${artistId}`;
  }

  static getPlaylistRouteUrl(playlistId: string) {
    return `/${RouterUtil.Configuration.Playlist}/${playlistId}`;
  }

  static getPlaylistContextUri(playlistId: string) {
    return `spotify:playlist:${playlistId}`;
  }
}