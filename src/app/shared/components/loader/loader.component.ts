import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() public diameter = 40;
  @Input() public strokeWidth = 3;
  @Input() public color = '#080808';

  public get spinnerColor(): {} {
    return { color: this.color };
  }

}
