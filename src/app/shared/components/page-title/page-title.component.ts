import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { fontAwesomeIcons } from '../../constants/fa-icons';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  @Input() public showBackButton: false;
  @Input() public title: string;

  public icons = fontAwesomeIcons;

  public constructor(
    private readonly location: Location
  ) { }

  public ngOnInit(): void {
  }

  public back(): void {
    this.location.back();
  }

}
