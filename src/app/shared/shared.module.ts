import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongInfoComponent } from './components/song-info/song-info.component';
import { AudioControllerComponent } from './components/audio-controller/audio-controller.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

@NgModule({
  declarations: [
    SongInfoComponent,
    AudioControllerComponent,
    PlaylistComponent
  ],
  imports: [CommonModule],
  exports: [
    SongInfoComponent,
    AudioControllerComponent,
    PlaylistComponent
  ]
})
export class SharedModule {}