import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyImageService } from '../../services/spotify-api/spotify-image.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  
  currentSong = {
    name: 'Deja Vu',
    artist: 'Eminem',
    cover: ''
  };

  playlist = [
    { 
      name: 'Money Trees', 
      artist: 'Kendrick Lamar, Jay Rock', 
      duration: '6:27', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d0000485151c02c5fdea616ad3d5d904e'
    },
    { 
      name: 'I KNOW ?', 
      artist: 'Travis Scott', 
      duration: '3:32', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d00004851881d8d8378cd01099babcd44'
    },
    { 
      name: 'Gnat', 
      artist: 'Eminem', 
      duration: '3:45', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d00004851a5e14fce624e8639bfbddf15'
    },
    { 
      name: 'DNA.', 
      artist: 'Kendrick Lamar', 
      duration: '3:06', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d00004851908005950913e62b24340d3c'
    },
    { 
      name: 'St. Chroma (feat. Daniel Caesar)', 
      artist: 'Tyler, The Creator', 
      duration: '3:17', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d00004851a5c512b5187f6e99fd7e2ad5'
    },
    { 
      name: 'OUT WEST (feat. Young Thug)', 
      artist: 'JACKBOYS, Travis Scott', 
      duration: '2:38', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d0000485150d0d069a634a671d4fb8b34'
    },
    { 
      name: 'Beautiful', 
      artist: 'Snoop Dogg, Pharrell Williams', 
      duration: '4:58', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d000048515f3ede47954a7a07ac2c799c'
    },
    { 
      name: 'Farewell', 
      artist: 'Eminem', 
      duration: '4:08', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d00004851a5e14fce624e8639bfbddf15'
    },
    { 
      name: 'No Role Modelz', 
      artist: 'J. Cole', 
      duration: '4:53', 
      cover: '',
      originalUrl: 'https://i.scdn.co/image/ab67616d000048512cd15e5e537e2eeea2f26483'
    }
  ];

  constructor(private imageService: SpotifyImageService) {}

  ngOnInit(): void {
    this.currentSong.cover = this.imageService.getPlaceholder('large');
    
    const mainCoverUrl = 'https://i.scdn.co/image/ab67616d00001e02a5e14fce624e8639bfbddf15';
    this.imageService.preloadImage(mainCoverUrl).then(url => {
      this.currentSong.cover = url;
    });

    this.playlist.forEach(track => {
      track.cover = this.imageService.getPlaceholder('small');
      if (track.originalUrl) {
        this.imageService.preloadImage(track.originalUrl).then(url => {
          track.cover = url;
        });
      }
    });
  }

  handleMainImageError(event: Event): void {
    this.imageService.handleImageError(event, 'large');
  }

  handlePlaylistImageError(event: Event): void {
    this.imageService.handleImageError(event, 'small');
  }
}