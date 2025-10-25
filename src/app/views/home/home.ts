import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  
  placeholderCover = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="350" height="350"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="350" height="350"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="80" font-family="Arial"%3E♪%3C/text%3E%3C/svg%3E';

  placeholderSmall = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect fill="%23ddd" width="50" height="50"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3E♪%3C/text%3E%3C/svg%3E';

  currentSong = {
    name: 'Deja Vu',
    artist: 'Eminem',
    cover: this.placeholderCover 
  };

  playlist = [
    { name: 'Money Trees', artist: 'Kendrick Lamar, Jay Rock', duration: '6:27', cover: this.placeholderSmall },
    { name: 'I KNOW ?', artist: 'Travis Scott', duration: '3:32', cover: this.placeholderSmall },
    { name: 'Gnat', artist: 'Eminem', duration: '3:45', cover: this.placeholderSmall },
    { name: 'DNA.', artist: 'Kendrick Lamar', duration: '3:06', cover: this.placeholderSmall },
    { name: 'St. Chroma (feat. Daniel Caesar)', artist: 'Tyler, The Creator', duration: '3:17', cover: this.placeholderSmall },
    { name: 'OUT WEST (feat. Young Thug)', artist: 'JACKBOYS, Travis Scott', duration: '2:38', cover: this.placeholderSmall },
    { name: 'Beautiful', artist: 'Snoop Dogg, Pharrell Williams', duration: '4:58', cover: this.placeholderSmall },
    { name: 'Farewell', artist: 'Eminem', duration: '4:08', cover: this.placeholderSmall },
    { name: 'No Role Modelz', artist: 'J. Cole', duration: '4:53', cover: this.placeholderSmall }
  ];

  loadRealCover(imageUrl: string): void {
    const img = new Image();
    img.onload = () => {
      this.currentSong.cover = imageUrl;
    };
    img.onerror = () => {
      console.warn('No se pudo cargar la imagen, usando placeholder');
      this.currentSong.cover = this.placeholderCover;
    };
    img.src = imageUrl;
  }
}