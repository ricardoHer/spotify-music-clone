import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { IconModule } from '../../../../../shared/ui/icon/src/lib/icon.module';
import { UserDropdownComponent } from "./user-dropdown.component";
import { SvgIconComponent } from '@ngneat/svg-icon';

@NgModule({
    imports: [
        CommonModule,
        NzDropDownModule,
        IconModule,
        SvgIconComponent
    ],
    declarations: [UserDropdownComponent],
    exports: [UserDropdownComponent]
})
export class UserDropdownModule { }