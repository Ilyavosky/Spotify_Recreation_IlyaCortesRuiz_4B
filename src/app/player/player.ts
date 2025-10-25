import { Component, OnInit } from '@angular/core';
import { SpotifyAlbumService } from '../services/spotify-api/spotify-album-service';
import { Album } from '../interfaces/album';
import { Observable, switchMap, of, EMPTY } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit{

  album$: Observable<Album | null> | undefined
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private route: ActivatedRoute
  ){}
  
ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const albumId = params.get('id'); 
        this.isLoading = true;
        this.hasError = false;
        if (albumId) {
          console.log(`Fetching album with ID: ${albumId}`);
          return this._spotifyAlbum.getAlbum(albumId).pipe(
             catchError(error => {
               console.error('PlayerComponent: Error fetching album details:', error);
               this.hasError = true;
               this.isLoading = false;
               return of(null);
             })
          );
        } else {
          console.warn('No album ID found in route parameters. Displaying default or empty.');
          this.isLoading = false;
          return of(null);
        }
      })
    );

    this.album$.subscribe(album => {
        this.isLoading = false;
    });
  }
}
