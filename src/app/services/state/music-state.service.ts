import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentTrack {
  name: string;
  artist: string;
  cover: string;
  albumId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicStateService {
  private currentTrackSubject = new BehaviorSubject<CurrentTrack | null>(null);
  public currentTrack$: Observable<CurrentTrack | null> = this.currentTrackSubject.asObservable();

  constructor() {}

  setCurrentTrack(track: CurrentTrack): void {
    this.currentTrackSubject.next(track);
  }

  getCurrentTrack(): CurrentTrack | null {
    return this.currentTrackSubject.value;
  }

  clearTrack(): void {
    this.currentTrackSubject.next(null);
  }
}