import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDropdownModule } from '../../../user-dropdown/src/user-dropdown/user-dropdown.module';
import { SocialShareModule } from '../../../social-share/src/social-share/social-share.module';
import { TopBarComponent } from './top-bar.component';

@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    UserDropdownModule,
    SocialShareModule
  ],
  exports: [TopBarComponent]
})
export class TopBarModule { }
