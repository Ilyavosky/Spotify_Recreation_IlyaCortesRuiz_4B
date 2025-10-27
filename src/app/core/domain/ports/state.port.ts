import { Observable } from 'rxjs';
import { CurrentTrack, SearchResults } from '../models';

export abstract class MusicStatePort {
  abstract getCurrentTrack(): Observable<CurrentTrack | null>;
  abstract setCurrentTrack(track: CurrentTrack): void;
  abstract clearTrack(): void;
}

export abstract class SearchStatePort {
  abstract getResults(): Observable<SearchResults | null>;
  abstract getLoadingState(): Observable<boolean>;
  abstract getErrorState(): Observable<boolean>;
  abstract setLoading(loading: boolean): void;
  abstract updateResults(results: SearchResults | null, error?: boolean): void;
  abstract clearResults(): void;
}