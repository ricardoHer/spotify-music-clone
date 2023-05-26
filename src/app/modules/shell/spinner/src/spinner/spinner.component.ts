import { Component, Input } from '@angular/core';
import { SVG_CONFIG } from '@ngneat/svg-icon/lib/providers';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() size: keyof SVG_CONFIG['sizes'] = 'x1';
}
