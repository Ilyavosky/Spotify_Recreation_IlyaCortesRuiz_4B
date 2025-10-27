import { NgModule } from '@angular/core';
import { AlbumPort, SearchPort, AuthenticationPort, MusicStatePort, SearchStatePort } from '../domain/ports';
import {
  SpotifyAlbumAdapter,
  SpotifySearchAdapter,
  SpotifyAuthAdapter,
  MusicStateAdapter,
  SearchStateAdapter
} from './adapters';

@NgModule({
  providers: [
    { provide: AlbumPort, useClass: SpotifyAlbumAdapter },
    { provide: SearchPort, useClass: SpotifySearchAdapter },
    { provide: AuthenticationPort, useClass: SpotifyAuthAdapter },
    { provide: MusicStatePort, useClass: MusicStateAdapter },
    { provide: SearchStatePort, useClass: SearchStateAdapter }
  ]
})
export class InfrastructureModule {}