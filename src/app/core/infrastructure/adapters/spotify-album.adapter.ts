import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumPort } from '../../domain/ports';
import { Album, Track, ImageModel } from '../../domain/models';
import { environment } from '../../../../environments/environment';

interface SpotifyAlbumResponse {
  id: string;
  name: string;
  total_tracks: number;
  href: string;
  images: Array<{ width: number; height: number; url: string }>;
  artists: Array<{ id: string; name: string; href: string }>;
  tracks: {
    items: Array<{
      id: string;
      name: string;
      duration_ms: number;
      href: string;
      artists: Array<{ id: string; name: string; href: string }>;
    }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyAlbumAdapter extends AlbumPort {
  constructor(private http: HttpClient) {
    super();
  }

  getAlbum(id: string): Observable<Album> {
    return this.http
      .get<SpotifyAlbumResponse>(`${environment.API_URL}/albums/${id}`)
      .pipe(map(response => this.mapToAlbum(response)));
  }

  private mapToAlbum(response: SpotifyAlbumResponse): Album {
    const mappedTracks: Track[] = response.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      durationMs: track.duration_ms,
      href: track.href,
      artists: track.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      }))
    }));

    const mappedImages: ImageModel[] = response.images.map(image => ({
      width: image.width,
      height: image.height,
      url: image.url
    }));

    return {
      id: response.id,
      name: response.name,
      totalTracks: response.total_tracks,
      href: response.href,
      images: mappedImages,
      tracks: mappedTracks,
      artists: response.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      }))
    };
  }
}