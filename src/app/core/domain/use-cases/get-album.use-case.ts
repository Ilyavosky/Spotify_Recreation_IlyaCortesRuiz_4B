import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models';
import { AlbumPort } from '../ports';

@Injectable({
  providedIn: 'root'
})
export class GetAlbumUseCase {
  constructor(private albumPort: AlbumPort) {}

  execute(id: string): Observable<Album> {
    return this.albumPort.getAlbum(id);
  }
}