import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { RoutingPaths } from '../../shared/enums/routing-path.enum';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public icons = {
    github: faGithub,
    users: faUsers
  };
  public loading = false;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public githubLogin() {
    this.loading = true;
    this.authService.logInWithGithub()
      .then((result: any) => {
        this.authService.token = result.credential.accessToken;
        this.router.navigate([RoutingPaths.dashboard]);
      })
      .catch((error) => console.error('Authentication failed'))
      .finally(() => this.loading = false);
  }

  public continueWithoutLogin() {
    this.router.navigate([RoutingPaths.dashboard]);
  }

}
