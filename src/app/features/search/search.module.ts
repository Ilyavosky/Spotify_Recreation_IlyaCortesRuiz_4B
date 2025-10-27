import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, FormsModule],
  exports: [SearchBarComponent]  // ← Asegúrate que está exportado
})
export class SearchModule {}