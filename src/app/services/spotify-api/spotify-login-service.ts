import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environments } from '../../../environments/environment.development';
=======
import { environment } from '../../../environments/environment.development';
>>>>>>> 95deea417ac33e1cc11eed2a4629bcca8e3b32f4

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {
<<<<<<< HEAD

  constructor(
    private _http:HttpClient
  ) {  }

  getToken(): Observable<any> {
    const body = new HttpParams()
      .set("grant_type", "client_credentials")
      .set("client_id", environments.CLIENT_ID)
      .set("client_secret", environments.CLIENT_SECRET);
    return this._http.post<any>(
      environments.AUTH_API_URL,
      body.toString(),
      {
        headers: {'Content-Type': "application/x-www-form-urlencoded"}
      }
    );

  }
=======
  
  constructor(
    private _http:HttpClient
  ){  }

  getAccessToken(): Observable<any> {

    const body = new HttpParams()
      .set('grant_type','client_credentials')
      .set('client_id',environment.CLIENT_ID)
      .set('client_secret',environment.CLIENT_SECRET);

    return this._http.post<any>(
      environment.AUTH_API_URL,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }

>>>>>>> 95deea417ac33e1cc11eed2a4629bcca8e3b32f4
}
