import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthStore } from 'src/app/shared/store/auth/auth.store';

@Component({
  selector: 'app-unauthorized-modal',
  templateUrl: './unauthorized-modal.component.html',
  styleUrls: ['./unauthorized-modal.component.scss']
})
export class UnauthorizedModalComponent {

  confirmModal?: NzModalRef;

  constructor(private modal: NzModalRef, private store: AuthStore) {}

  authenticate() {
    this.store.redirectToAuthorize();
    this.modal.destroy();
  }

}
