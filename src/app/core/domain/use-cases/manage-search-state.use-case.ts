import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResults } from '../models';
import { SearchStatePort } from '../ports';

@Injectable({
  providedIn: 'root'
})
export class ManageSearchStateUseCase {
  constructor(private searchStatePort: SearchStatePort) {}

  getResults(): Observable<SearchResults | null> {
    return this.searchStatePort.getResults();
  }

  getLoadingState(): Observable<boolean> {
    return this.searchStatePort.getLoadingState();
  }

  getErrorState(): Observable<boolean> {
    return this.searchStatePort.getErrorState();
  }

  setLoading(loading: boolean): void {
    this.searchStatePort.setLoading(loading);
  }

  updateResults(results: SearchResults | null, error: boolean = false): void {
    this.searchStatePort.updateResults(results, error);
  }

  clearResults(): void {
    this.searchStatePort.clearResults();
  }
}