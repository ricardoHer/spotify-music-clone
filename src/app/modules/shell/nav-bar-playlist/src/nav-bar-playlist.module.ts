import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarPlaylistComponent } from './nav-bar-playlist/nav-bar-playlist.component';
import { SpinnerModule } from '../../spinner/src/spinner/spinner.module';
import { NavPlaylistComponent } from './nav-playlist/nav-playlist.component';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule
  ],
  declarations: [
    NavBarPlaylistComponent,
    NavPlaylistComponent
  ],
  exports: [
    NavBarPlaylistComponent,
    NavPlaylistComponent
  ]
})
export class NavBarPlaylistModule { }
