import { Component, input } from '@angular/core';
import { Track, ImageModel } from '../../../core/domain/models';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  playlist = input.required<Track[] | undefined>();
  cover = input.required<ImageModel | undefined>();
}
