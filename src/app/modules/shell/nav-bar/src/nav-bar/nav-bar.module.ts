import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { RouterModule } from '@angular/router';
import { NavBarPlaylistModule } from '../../../nav-bar-playlist/src/nav-bar-playlist.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavBarPlaylistModule
  ],
  declarations: [
    NavBarComponent
  ],
  exports: [
    NavBarComponent
  ]
})
export class NavBarModule { }
