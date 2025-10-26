import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SearchStateService } from '../../services/state/search-state.service';
import { MusicStateService } from '../../services/state/music-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './browse.html',
  styleUrls: ['./browse.css']
})
export class BrowseComponent implements OnInit, OnDestroy {
  results: any = null;
  isLoading: boolean = false;
  hasError: boolean = false;

  staticPlaylist = [
    { 
      name: 'Money Trees', 
      artist: 'Kendrick Lamar, Jay Rock', 
      duration: '6:27', 
      cover: 'https://i.scdn.co/image/ab67616d0000485151c02c5fdea616ad3d5d904e'
    },
    { 
      name: 'I KNOW ?', 
      artist: 'Travis Scott', 
      duration: '3:32', 
      cover: 'https://i.scdn.co/image/ab67616d00004851881d8d8378cd01099babcd44'
    },
    { 
      name: 'Gnat', 
      artist: 'Eminem', 
      duration: '3:45', 
      cover: 'https://i.scdn.co/image/ab67616d00004851a5e14fce624e8639bfbddf15'
    },
    { 
      name: 'DNA.', 
      artist: 'Kendrick Lamar', 
      duration: '3:06', 
      cover: 'https://i.scdn.co/image/ab67616d00004851908005950913e62b24340d3c'
    },
    { 
      name: 'St. Chroma (feat. Daniel Caesar)', 
      artist: 'Tyler, The Creator', 
      duration: '3:17', 
      cover: 'https://i.scdn.co/image/ab67616d00004851a5c512b5187f6e99fd7e2ad5'
    },
    { 
      name: 'OUT WEST (feat. Young Thug)', 
      artist: 'JACKBOYS, Travis Scott', 
      duration: '2:38', 
      cover: 'https://i.scdn.co/image/ab67616d0000485150d0d069a634a671d4fb8b34'
    },
    { 
      name: 'Beautiful', 
      artist: 'Snoop Dogg, Pharrell Williams', 
      duration: '4:58', 
      cover: 'https://i.scdn.co/image/ab67616d000048515f3ede47954a7a07ac2c799c'
    },
    { 
      name: 'Farewell', 
      artist: 'Eminem', 
      duration: '4:08', 
      cover: 'https://i.scdn.co/image/ab67616d00004851a5e14fce624e8639bfbddf15'
    },
    { 
      name: 'No Role Modelz', 
      artist: 'J. Cole', 
      duration: '4:53', 
      cover: 'https://i.scdn.co/image/ab67616d000048512cd15e5e537e2eeea2f26483'
    }
  ];

  placeholderSVG = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23ddd" width="50" height="50"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3E♪%3C/text%3E%3C/svg%3E';

  private subscriptions = new Subscription();

  constructor(
    private searchStateService: SearchStateService,
    private musicStateService: MusicStateService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchStateService.searchResults$.subscribe(results => {
        this.results = results;
        this.cdr.detectChanges();
      })
    );
    
    this.subscriptions.add(
      this.searchStateService.isLoading$.subscribe(loading => {
        this.isLoading = loading;
        this.cdr.detectChanges();
      })
    );
    
    this.subscriptions.add(
      this.searchStateService.hasError$.subscribe(error => {
        this.hasError = error;
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  playTrack(track: any): void {
    this.musicStateService.setCurrentTrack({
      name: track.name,
      artist: track.artists[0]?.name || 'Unknown Artist',
      cover: track.album?.images[0]?.url || track.album?.images[1]?.url || this.placeholderSVG,
      albumId: track.album?.id
    });
    this.router.navigate(['/']);
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.placeholderSVG;
    }
  }
}