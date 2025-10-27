import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResults } from '../models';
import { SearchPort } from '../ports';

@Injectable({
  providedIn: 'root'
})
export class SearchMusicUseCase {
  constructor(private searchPort: SearchPort) {}

  execute(query: string): Observable<SearchResults> {
    return this.searchPort.search(query);
  }
}