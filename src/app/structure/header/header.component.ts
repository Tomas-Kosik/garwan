import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';
import { fontAwesomeIcons } from '../../shared/constants/fa-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User | null;
  public icons = fontAwesomeIcons;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => this.user = user
    );
  }

  public goToDetail(username: string): void {
    this.router.navigate([`${username}`], { relativeTo: this.activatedRoute });
  }

  public signOut(): void {
    this.authService.signOut();
  }

}
