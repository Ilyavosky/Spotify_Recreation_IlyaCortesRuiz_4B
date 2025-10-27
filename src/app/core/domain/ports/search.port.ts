import { Observable } from 'rxjs';
import { SearchResults } from '../models';

export abstract class SearchPort {
  abstract search(query: string): Observable<SearchResults>;
}