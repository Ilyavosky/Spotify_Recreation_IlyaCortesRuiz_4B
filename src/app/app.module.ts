import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PlayerModule } from './features/player/player.module';
import { SearchModule } from './features/search/search.module';
import { BrowseModule } from './features/browse/browse.module';
import { HomeModule } from './features/home/home.module';

import { authInterceptor } from './core/infrastructure/interceptors/auth.interceptor';
import { addAuthHeaderInterceptor } from './core/infrastructure/interceptors/add-auth-header.interceptor';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PlayerModule,
    SearchModule,
    BrowseModule,
    HomeModule
  ],
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        addAuthHeaderInterceptor
      ])
    )
  ],
  bootstrap: [App]
})
export class AppModule {}