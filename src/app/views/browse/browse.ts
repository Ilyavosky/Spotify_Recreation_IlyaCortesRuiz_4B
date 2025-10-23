import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '../../search/search-module';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    SearchModule,
    RouterLink
  ],
  templateUrl: './browse.html',
  styleUrls: ['./browse.css']
})
export class BrowseComponent {
  results: any = null;
  isLoading: boolean = false;
  hasError: boolean = false;

  onSearchStarted(): void {
    this.isLoading = true;
    this.hasError = false;
    this.results = null;
    console.log("Search started...");
  }

  handleSearchResults(data: any): void {
    this.isLoading = false;
    if (data && data.albums && data.tracks) {
      console.log('Search results received:', data);
      this.results = data;
      this.hasError = false;
    } else if (data === null) {
       this.results = null;
       this.hasError = true;
       console.error('Received null results, indicating a search error.');
    } else {
        this.results = data;
        this.hasError = false;
         console.log('Received empty or unexpected results structure:', data);
    }
  }
}