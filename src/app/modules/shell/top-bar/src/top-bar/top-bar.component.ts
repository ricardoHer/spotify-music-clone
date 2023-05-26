import { Location } from "@angular/common"
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }

  forward() {
    this.location.forward();
  }

}
