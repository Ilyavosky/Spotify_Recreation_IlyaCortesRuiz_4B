import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '../../search/search-module';
import { RouterLink} from '@angular/router';
import { SearchStateService } from '../../services/state/search-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './browse.html',
  styleUrls: ['./browse.css']
})
export class BrowseComponent implements OnInit, OnDestroy{
  results: any = null;
  isLoading: boolean = false;
  hasError: boolean = false;

  private subscriptions = new Subscription();

 constructor(private searchStateService: SearchStateService) { }

ngOnInit(): void {
    this.subscriptions.add(
        this.searchStateService.searchResults$.subscribe(results => {
          this.results = results;
          console.log('BrowseComponent received results via service:', results);
        })
    );
    this.subscriptions.add(
        this.searchStateService.isLoading$.subscribe(loading => {
          this.isLoading = loading;
          console.log('BrowseComponent isLoading via service:', loading);
        })
    );
     this.subscriptions.add(
        this.searchStateService.hasError$.subscribe(error => {
          this.hasError = error;
           console.log('BrowseComponent hasError via service:', error);
        })
     );
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}