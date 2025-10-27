import { Artist } from './artist.model';

export interface Track {
  id: string;
  name: string;
  durationMs: number;
  href: string;
  artists: Artist[];
  album?: {
    id: string;
    name: string;
    images: Array<{ url: string; width: number; height: number }>;
  };
}
