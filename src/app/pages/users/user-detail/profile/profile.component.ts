import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService
  ) { }

  public ngOnInit(): void {
    this.getUsernameAndSetDetail();
  }

  private getUsernameAndSetDetail(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.userService.getUser(params.username)
          .subscribe((user) => this.user = user);
      });
  }

}
