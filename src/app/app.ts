/*import { Component, OnInit} from '@angular/core';
import { SpotifyLoginService } from './services/spotify-api/spotify-login-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{

  constructor(private spotifyLogin: SpotifyLoginService){}

  ngOnInit(): void {
    this.refreshToken();
  }

  private refreshToken(): void {
    console.log('App Init - Refreshing token...');
    this.spotifyLogin.getAccessToken().subscribe({
      next: (response) => {
        console.log('App Init - Token refreshed successfully');
        console.log('App Init - Token stored:', localStorage.getItem('spotify_token')?.substring(0, 20) + '...');
      },
      error: (err) => {
        console.error('App Init - Error refreshing token:', err);
      }
    });
  }
}*/

import { Component, OnInit } from '@angular/core';
import { AuthenticateUseCase } from './core/domain/use-cases';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  ngOnInit(): void {
    this.refreshToken();
  }

  private refreshToken(): void {
    this.authenticateUseCase.execute().subscribe({
      next: () => {
        console.log('Token refreshed successfully');
      },
      error: (err) => {
        console.error('Error refreshing token:', err);
      }
    });
  }
}