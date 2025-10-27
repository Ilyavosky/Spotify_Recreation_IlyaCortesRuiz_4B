import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap, catchError, finalize } from 'rxjs/operators';
import { Album } from '../../core/domain/models';
import { GetAlbumUseCase } from '../../core/domain/use-cases';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  album$: Observable<Album | null> | undefined;
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private getAlbumUseCase: GetAlbumUseCase,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.album$ = this.route.paramMap.pipe(
      tap(() => {
        this.isLoading = true;
        this.hasError = false;
        this.cdr.detectChanges();
      }),
      switchMap((params: ParamMap) => {
        const albumId = params.get('id');

        if (!albumId) {
          this.isLoading = false;
          this.cdr.detectChanges();
          return of(null);
        }

        return this.getAlbumUseCase.execute(albumId).pipe(
          catchError(error => {
            console.error('Error loading album:', error);
            this.hasError = true;
            this.cdr.detectChanges();
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          })
        );
      })
    );

    this.album$.subscribe({
      next: () => this.cdr.detectChanges(),
      error: () => this.cdr.detectChanges()
    });
  }
}