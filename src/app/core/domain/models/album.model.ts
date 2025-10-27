import { ImageModel } from './image.model';
import { Track } from './track.model';

export interface Album {
  id: string;
  name: string;
  totalTracks: number;
  href: string;
  images: ImageModel[];
  tracks: Track[];
  artists?: Array<{ id: string; name: string }>;
}