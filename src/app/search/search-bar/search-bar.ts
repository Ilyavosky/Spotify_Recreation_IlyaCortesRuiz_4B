import { Component, EventEmitter, Output } from '@angular/core';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  searchQuery: string = '';
  @Output() searchResults = new EventEmitter<any>();
  @Output() searchInitiated = new EventEmitter<void>();
  constructor(
    private _spotifySearch: SpotifySearchService
  ){}

  doSearch(): void{
    if (this.searchQuery.trim() === '') {
      this.searchResults.emit({ albums: { items: [] }, tracks: { items: [] } });
      return;
    }
    this.searchInitiated.emit();
    this._spotifySearch.doSearch(this.searchQuery).subscribe({
      next: (data) => {
        this.searchResults.emit(data);
      },
      error: (error) => {
        console.error('Error during search:', error);
        this.searchResults.emit(null);
      }
    });
  }
} 
