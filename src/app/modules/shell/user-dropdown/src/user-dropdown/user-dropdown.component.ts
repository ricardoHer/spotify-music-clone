import { Component } from '@angular/core';
import { AuthStore } from 'src/app/shared/store/auth/auth.store';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
  userName$ = this.store.userName$;
  userAvatar$ = this.store.userAvatar$;
  userProduct$ = this.store.userProduct$;


  constructor(private store: AuthStore  ) { }

  openLocation() {
    const url = 'https://www.spotify.com/us/premium/';
    window.open(url, '_blank');
  }

}
