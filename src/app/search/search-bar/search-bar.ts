/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';
import { SearchStateService } from '../../services/state/search-state.service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchQuery: string = '';
  
  constructor(
    private _spotifySearch: SpotifySearchService,
    private searchStateService: SearchStateService,
    private router: Router
  ){}

  doSearch(): void{
    console.log('SearchBar: doSearch called with query:', this.searchQuery);

    if (this.searchQuery.trim() === '') {
      console.log('SearchBar: Empty query, clearing results');
      this.searchStateService.updateResults({ albums: { items: [] }, tracks: { items: [] } });
      return;
    }

    this.router.navigate(['/browse']);

    console.log('SearchBar: Starting search...');
    this.searchStateService.setLoading(true);
    
    this._spotifySearch.doSearch(this.searchQuery).subscribe({
      next: (data) => {
        this.searchStateService.updateResults(data);
      },
      error: (error) => {
        console.error('Error during search:', error);
        this.searchStateService.updateResults(null, true);
      }
    });
  }
}*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';
import { SearchStateService } from '../../services/state/search-state.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (query.trim().length < 2) {
            this.suggestions = [];
            this.showSuggestions = false;
            return [];
          }
          return this.spotifySearch.doSearch(query);
        })
      ).subscribe({
        next: (data: any) => {
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
                image: track.album?.images[2]?.url || track.album?.images[0]?.url
              }))
            ];
            this.showSuggestions = true;
          } else {
            this.suggestions = [];
            this.showSuggestions = false;
          }
        },
        error: () => {
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
        this.searchStateService.updateResults(data);
      },
      error: () => {
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