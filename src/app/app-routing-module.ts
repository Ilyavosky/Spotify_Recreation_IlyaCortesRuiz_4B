import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Player } from './player/player';
//import { AudioController } from './audio-controller/audio-controller';
import { BrowseComponent } from './views/browse/browse';

const routes: Routes = [
  {
    path: '',
    component: BrowseComponent,
    title: 'Browse Music'
  },
  {
    path: 'album/:id',
    component: Player,
    title: 'Album Player'
    //path: 'player',
    //component:Player,
    //title: 'Player Music'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
    //path:'controller',
    //component: AudioController
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
