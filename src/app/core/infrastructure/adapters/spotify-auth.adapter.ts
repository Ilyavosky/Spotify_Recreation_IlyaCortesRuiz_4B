import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationPort } from '../../domain/ports';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthAdapter extends AuthenticationPort {
  constructor(private http: HttpClient) {
    super();
  }

  getAccessToken(): Observable<string> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', environment.CLIENT_ID);
    body.set('client_secret', environment.CLIENT_SECRET);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .post<any>(environment.AUTH_API_URL, body.toString(), { headers })
      .pipe(
        tap(response => {
          if (response?.access_token) {
            localStorage.setItem('spotify_token', response.access_token);
          }
        }),
        map(response => response.access_token)
      );
  }

  hasToken(): boolean {
    return !!localStorage.getItem('spotify_token');
  }

  clearToken(): void {
    localStorage.removeItem('spotify_token');
  }
}