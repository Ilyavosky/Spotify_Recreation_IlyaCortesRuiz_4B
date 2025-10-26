import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';
import { SearchStateService } from '../../services/state/search-state.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit, OnDestroy {
  searchQuery: string = '';
  suggestions: any[] = [];
  showSuggestions: boolean = false;
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();
  
  constructor(
    private spotifySearch: SpotifySearchService,
    private searchStateService: SearchStateService,
    private router: Router
  ){}

  ngOnInit(): void {
    console.log('SearchBar initialized');
    
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          console.log('Search query:', query);
          
          if (query.trim().length < 2) {
            this.suggestions = [];
            this.showSuggestions = false;
            return of(null);
          }
          
          console.log('Calling Spotify API for suggestions...');
          return this.spotifySearch.doSearch(query).pipe(
            catchError(error => {
              console.error('Suggestion search error:', error);
              return of(null);
            })
          );
        })
      ).subscribe({
        next: (data: any) => {
          console.log('Suggestions data received:', data);
          
          if (data && (data.albums?.items?.length > 0 || data.tracks?.items?.length > 0)) {
            this.suggestions = [
              ...(data.albums?.items?.slice(0, 3) || []).map((album: any) => ({
                type: 'album',
                id: album.id,
                name: album.name,
                artist: album.artists[0]?.name,
                image: album.images[2]?.url || album.images[0]?.url
              })),
              ...(data.tracks?.items?.slice(0, 3) || []).map((track: any) => ({
                type: 'track',
                id: track.id,
                name: track.name,
                artist: track.artists[0]?.name,
                image: track.album?.images[2]?.url || track.album?.images[0]?.url,
                albumData: track.album
              }))
            ];
            this.showSuggestions = true;
            console.log('Suggestions updated:', this.suggestions);
          } else {
            this.suggestions = [];
            this.showSuggestions = false;
          }
        },
        error: (error) => {
          console.error('Subscription error:', error);
          this.suggestions = [];
          this.showSuggestions = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  selectSuggestion(suggestion: any): void {
    this.searchQuery = suggestion.name;
    this.showSuggestions = false;
    
    if (suggestion.type === 'album') {
      this.router.navigate(['/album', suggestion.id]);
    } else {
      this.doSearch();
    }
  }

  doSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.searchStateService.updateResults({ albums: { items: [] }, tracks: { items: [] } });
      return;
    }

    this.showSuggestions = false;
    this.router.navigate(['/browse']);
    this.searchStateService.setLoading(true);
    
    this.spotifySearch.doSearch(this.searchQuery).subscribe({
      next: (data) => {
        console.log('Search results:', data);
        this.searchStateService.updateResults(data);
      },
      error: (error) => {
        console.error('Search error in doSearch:', error);
        this.searchStateService.updateResults(null, true);
      }
    });
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }
}