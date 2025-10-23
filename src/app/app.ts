import { Component, OnInit} from '@angular/core';
import { SpotifyLoginService } from './services/spotify-api/spotify-login-service';
import { SpotifyAlbumService } from './services/spotify-api/spotify-album-service';
import { CookiesStorageService } from './services/general/cookies-storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{

  constructor(
    private _spotifyLogin: SpotifyLoginService,
    private _cookieStorage: CookiesStorageService
  ){}

  ngOnInit(): void {
    const tokenExists = this._cookieStorage.exists('access_token');
    const tokenIsValid = this._cookieStorage.isCookieValid('access_token');
    console.log(`App Init - Token Exists: ${tokenExists}, Token Valid (not empty): ${tokenIsValid}`);
   if(!tokenExists || !tokenIsValid) {
      console.log('App Init - Attempting to fetch new access token...');
      this._spotifyLogin.getAccessToken().subscribe({
         next: (response) => {
             // Token saving is handled by the authInterceptor, just log success
             console.log('App Init - Successfully initiated token fetch.');
         },
         error: (err) => {
             console.error('App Init - Error fetching access token:', err);
         }
      });
    } else {
        console.log('App Init - Using existing token from cookies.');
    }
  }
}