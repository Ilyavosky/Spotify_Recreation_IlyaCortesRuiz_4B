import { Component, EventEmitter, Output } from '@angular/core';
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
    private searchStateService: SearchStateService
  ){}

  doSearch(): void{
    if (this.searchQuery.trim() === '') {
      this.searchStateService.updateResults({ albums: { items: [] }, tracks: { items: [] } });
      return;
    }
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
} 
