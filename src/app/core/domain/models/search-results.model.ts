import { Album } from './album.model';
import { Track } from './track.model';

export interface SearchResults {
  albums: {
    items: Album[];
  };
  tracks: {
    items: Track[];
  };
}