import { Component } from '@angular/core';
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
    console.log('SearchBar: doSearch called with query:', this.searchQuery);

    if (this.searchQuery.trim() === '') {
      console.log('SearchBar: Empty query, clearing results');
      this.searchStateService.updateResults({ albums: { items: [] }, tracks: { items: [] } });
      return;
    }

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
} 
