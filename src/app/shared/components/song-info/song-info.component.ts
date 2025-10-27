import { Component, input } from '@angular/core';
import { Track, ImageModel } from '../../../core/domain/models';

@Component({
  selector: 'app-song-info',
  standalone: false,
  templateUrl: './song-info.component.html',
  styleUrl: './song-info.component.css',
  host: {
    '[class]': 'displayMode()',
  }
})
export class SongInfoComponent {
  displayMode = input.required<string>({ alias: 'displayMode' });
  song = input.required<Track | undefined>();
  cover = input.required<ImageModel | undefined>();
}