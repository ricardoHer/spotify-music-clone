import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TopBarModule } from 'src/app/modules/shell/top-bar/src/top-bar/top-bar.module';
import { NavBarModule } from 'src/app/modules/shell/nav-bar/src/nav-bar/nav-bar.module';

@NgModule({
  declarations: [ LayoutComponent ],
  imports: [
    CommonModule,
    TopBarModule,
    NavBarModule
  ]
})
export class LayoutModule { }
