import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchStatePort } from '../../domain/ports';
import { SearchResults } from '../../domain/models';

@Injectable({
  providedIn: 'root'
})
export class SearchStateAdapter extends SearchStatePort {
  private resultsSubject = new BehaviorSubject<SearchResults | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<boolean>(false);

  getResults(): Observable<SearchResults | null> {
    return this.resultsSubject.asObservable();
  }

  getLoadingState(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  getErrorState(): Observable<boolean> {
    return this.errorSubject.asObservable();
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
    if (loading) {
      this.errorSubject.next(false);
      this.resultsSubject.next(null);
    }
  }

  updateResults(results: SearchResults | null, error: boolean = false): void {
    this.resultsSubject.next(results);
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  }

  clearResults(): void {
    this.resultsSubject.next(null);
    this.loadingSubject.next(false);
    this.errorSubject.next(false);
  }
}