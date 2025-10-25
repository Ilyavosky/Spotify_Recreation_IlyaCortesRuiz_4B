import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpotifyAlbumService } from '../services/spotify-api/spotify-album-service';
import { Album } from '../interfaces/album';
import { Observable, switchMap, of} from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, finalize, tap} from 'rxjs/operators';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit{

  album$: Observable<Album | null> | undefined;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ){}
  
ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      tap(() =>{
        console.log('Player: Started loading album');
        this.isLoading = true;
        this.hasError = false;
        this.cdr.detectChanges();
      }),
      switchMap((params: ParamMap) => {
        const albumId = params.get('id'); 
        
        if (!albumId) {
          console.warn('Player: No album ID found in route')
        this.isLoading = false;
        this.cdr.detectChanges();
        return of(null);
        }

        console.log('Player: Loading album with ID:', albumId);
        console.log('Player: Token on localStorage:', 
          localStorage.getItem('spotify_token') ? 'Present' : 'MISSING');

        return this._spotifyAlbum.getAlbum(albumId).pipe(
          tap(album => {
            console.log('Player: Album received:', album);
          }),
          catchError(error => {
            console.error('Player: Error loading album:', {
              status: error.status,
              statusText: error.statusText,
              url: error.url,
              message: error.message,
              fullError: error
            });
            this.hasError = true;
            this.cdr.detectChanges();
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
            console.log('Player: Load finished. isLoading=false, hasError=', this.hasError);
            this.cdr.detectChanges();
          })
        );
      })
    );

    this.album$.subscribe({
      next: album => {
        console.log('Player: Final state:', { album, isLoading: this.isLoading, hasError: this.hasError });
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Player: Error in subscription:', err);
                this.cdr.detectChanges();
      }
    });
  }
}
