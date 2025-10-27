import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SearchPort } from '../../domain/ports';
import { SearchResults } from '../../domain/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchAdapter extends SearchPort {
  constructor(private http: HttpClient) {
    super();
  }

  search(query: string): Observable<SearchResults> {
    const params = new HttpParams()
      .set('q', query)
      .set('type', 'album,track')
      .set('limit', '10')
      .set('market', 'ES');

    return this.http
      .get<any>(`${environment.API_URL}/search`, { params })
      .pipe(
        map(response => this.mapToSearchResults(response)),
        catchError(error => {
          console.error('Search error:', error);
          return throwError(() => error);
        })
      );
  }

  private mapToSearchResults(response: any): SearchResults {
    return {
      albums: {
        items: response.albums?.items || []
      },
      tracks: {
        items: response.tracks?.items || []
      }
    };
  }
}