import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SvgIconComponent } from '@ngneat/svg-icon';
import { SocialShareComponent } from './social-share.component';

@NgModule({
  declarations: [SocialShareComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    SvgIconComponent
  ],
  exports: [
    SocialShareComponent
  ]
})
export class SocialShareModule { }
