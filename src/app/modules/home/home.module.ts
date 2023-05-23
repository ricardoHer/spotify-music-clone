import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module'
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UserDropdownModule } from "../shell/user-dropdown/src/user-dropdown/user-dropdown.module";

@NgModule({
    declarations: [
        HomeComponent,
        MenuBarComponent,
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        UserDropdownModule
    ]
})
export class HomeModule { }
