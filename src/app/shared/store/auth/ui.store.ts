import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { NzModalService } from "ng-zorro-antd/modal";
import { filter, switchMapTo, tap } from "rxjs/operators";
import { UnauthorizedModalComponent } from "src/app/modules/shell/unauthorized-modal/src/unauthorized-modal/unauthorized-modal.component";
import { NavItem } from "../../models/nav-itesm";

interface UIState {
    navItems: NavItem[];
    isShowUnauthorizedModal: boolean;
}

@Injectable({ providedIn: 'root' })
export class UIStore extends ComponentStore<UIState> {
    constructor(private modalService: NzModalService) {
        super({
            navItems: [
                { label: 'Home', path: '/home', exact: true },
                { label: 'Search', path: '/search' },
                { label: 'Browse', path: '/browse' },
                { label: 'My Playlists', path: '/collection/playlists' },
                { label: 'My Albums', path: '/albums' }
            ],
            isShowUnauthorizedModal: false
        })
    }

    readonly isShowUnauthorizedModal$ = this.select((s) => s.isShowUnauthorizedModal);
    readonly navItems$ = this.select(({ navItems }) => navItems);

    readonly showUnauthorizedModal = this.effect((params$) => 
        params$.pipe(
            switchMapTo(this.isShowUnauthorizedModal$),
            filter((x) => !x),
            tap(() => {
                this.patchState({
                    isShowUnauthorizedModal: true
                });
                this.modalService.create({
                    nzTitle: 'Your access token has expired!',
                    nzContent: UnauthorizedModalComponent,
                    nzClosable: false,
                    nzKeyboard: false,
                    nzMaskClosable: false
                })
            })
        )
    )
}