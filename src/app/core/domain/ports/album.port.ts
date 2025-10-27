import { Observable } from 'rxjs';
import { Album } from '../models';

export abstract class AlbumPort {
  abstract getAlbum(id: string): Observable<Album>;
}