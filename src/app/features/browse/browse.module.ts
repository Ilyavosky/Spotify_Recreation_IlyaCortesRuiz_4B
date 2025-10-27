import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowseComponent } from './browse.component';

@NgModule({
  declarations: [BrowseComponent],
  imports: [CommonModule, RouterModule],
  exports: [BrowseComponent]
})
export class BrowseModule {}