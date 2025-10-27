import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentTrack } from '../models';
import { MusicStatePort } from '../ports';

@Injectable({
  providedIn: 'root'
})
export class ManageMusicStateUseCase {
  constructor(private musicStatePort: MusicStatePort) {}

  getCurrentTrack(): Observable<CurrentTrack | null> {
    return this.musicStatePort.getCurrentTrack();
  }

  playTrack(track: CurrentTrack): void {
    this.musicStatePort.setCurrentTrack(track);
  }

  stopPlayback(): void {
    this.musicStatePort.clearTrack();
  }
}