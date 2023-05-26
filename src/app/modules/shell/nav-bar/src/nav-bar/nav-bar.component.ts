import { Component } from '@angular/core';
import { UIStore } from '../../../../../shared/store/auth/ui.store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  readonly navItems$ = this.uiStore.navItems$;

  constructor(private readonly uiStore: UIStore) {}
}
