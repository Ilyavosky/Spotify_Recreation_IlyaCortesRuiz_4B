import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MusicStatePort } from '../../domain/ports';
import { CurrentTrack } from '../../domain/models';

@Injectable({
  providedIn: 'root'
})
export class MusicStateAdapter extends MusicStatePort {
  private currentTrackSubject = new BehaviorSubject<CurrentTrack | null>(null);

  getCurrentTrack(): Observable<CurrentTrack | null> {
    return this.currentTrackSubject.asObservable();
  }

  setCurrentTrack(track: CurrentTrack): void {
    this.currentTrackSubject.next(track);
  }

  clearTrack(): void {
    this.currentTrackSubject.next(null);
  }
}