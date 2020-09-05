import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user: User | null;
  public icons = {
    github: faGithub,
  };

  public constructor(
    private readonly authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => this.user = user
    );
  }

  public signOut(): void {
    this.authService.signOut();
  }

}
