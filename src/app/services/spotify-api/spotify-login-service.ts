import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {

  constructor(private _http: HttpClient) { }

  getAccessToken(): Observable<any> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.CLIENT_ID);
    body.set('client_secret', environment.CLIENT_SECRET);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this._http.post<any>(
      environment.AUTH_API_URL,
      body.toString(),
      { headers: headers }
    ).pipe(
      tap({
        next: (response) => {
          if (response?.access_token) {
            localStorage.setItem('spotify_token', response.access_token);
          }
        },
        error: (error) => {
          console.error('Error al obtener token:', error);
        }
      })
    );
  }

  getStoredToken(): string | null {
    return localStorage.getItem('spotify_token');
  }

  clearToken(): void {
    localStorage.removeItem('spotify_token');
  }

  hasToken(): boolean {
    return !!this.getStoredToken();
  }
}