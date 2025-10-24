import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchResultsSubject = new BehaviorSubject<any | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<boolean>(false);

  public searchResults$: Observable<any | null> = this.searchResultsSubject.asObservable();
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();
  public hasError$: Observable<boolean> = this.errorSubject.asObservable();

  constructor() { }

  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
    if (isLoading) {
      this.errorSubject.next(false);
      this.searchResultsSubject.next(null);
    }
  }

  updateResults(results: any | null, error: boolean = false): void {
    this.searchResultsSubject.next(results);
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  }

  clearResults(): void {
    this.searchResultsSubject.next(null);
    this.loadingSubject.next(false);
    this.errorSubject.next(false);
  }
}