import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyImageService {
  
  private readonly placeholders = {
    large: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="350" height="350"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="350" height="350"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="80" font-family="Arial"%3E♪%3C/text%3E%3C/svg%3E',
    medium: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-size="70" font-family="Arial"%3E♪%3C/text%3E%3C/svg%3E',
    small: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23ddd" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3E♪%3C/text%3E%3C/svg%3E',
    tiny: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40"%3E%3Crect fill="%23ddd" width="40" height="40"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="18"%3E♪%3C/text%3E%3C/svg%3E'
  };

  constructor() { }


  getImageUrl(spotifyUrl: string | undefined, size: 'large' | 'medium' | 'small' | 'tiny' = 'medium'): string {
    if (!spotifyUrl) {
      return this.placeholders[size];
    }

  
    if (spotifyUrl.includes('i.scdn.co')) {
      const alternativeUrl = spotifyUrl.replace('i.scdn.co', 'mosaic.scdn.co');
      return alternativeUrl;
    }

    return spotifyUrl;
  }


  getPlaceholder(size: 'large' | 'medium' | 'small' | 'tiny' = 'medium'): string {
    return this.placeholders[size];
  }


  handleImageError(event: Event, size: 'large' | 'medium' | 'small' | 'tiny' = 'medium'): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      if (!img.src.startsWith('data:')) {
        console.warn(`Failed to load image: ${img.src}, using placeholder`);
        img.src = this.placeholders[size];
      }
    }
  }

 
  async preloadImage(url: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => {
        console.warn(`Could not preload image: ${url}`);
        resolve(this.placeholders.medium);
      };
      img.src = url;
    });
  }
}