import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {
  
  constructor(private http: HttpClient) {}

  doSearch(q: string): Observable<any> {
    const token = localStorage.getItem('spotify_token');
    
    if (!token) {
      console.error('No token available for search');
      return throwError(() => new Error('No authentication token'));
    }

    const params = new HttpParams()
      .set('q', q)
      .set('type', 'album,track')
      .set('limit', '10')
      .set('market', 'ES');

    console.log('Search request - Token:', token.substring(0, 20) + '...');
    console.log('Search request - URL:', `${environment.API_URL}/search`);
    console.log('Search request - Params:', params.toString());

    return this.http.get<any>(
      `${environment.API_URL}/search`,
      { params: params }
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Search API error:', error);
        if (error.status === 401) {
          console.error('Token expired or invalid, consider refreshing');
        }
        return throwError(() => error);
      })
    );
  }
}
