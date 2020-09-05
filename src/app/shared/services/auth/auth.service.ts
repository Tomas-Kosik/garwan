import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { RoutingPaths } from '../../enums/routing-path.enum';

import { User } from '../../models/user.model';

const provider = new firebase.auth.GithubAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User | null>;
  public token;

  public constructor(
    private readonly router: Router,
    private readonly angularFireAuth: AngularFireAuth,
  ) {
    this.user$ = this.angularFireAuth.authState
      .pipe(
        switchMap((credentials: firebase.User) => {
          if (credentials) {
            return this.mapUser(credentials);
          }

          return of(null);
        })
      );
  }

  public logInWithGithub(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(provider);
  }

  public signOut(): void {
    this.angularFireAuth.signOut()
      .then(() => this.router.navigate([RoutingPaths.login]));
  }

  private mapUser(credentials: firebase.User): Observable<User> {
    return of({
      uid: credentials.uid,
      name: credentials.displayName,
      picture: credentials.photoURL,
      email: credentials.email
    });
  }
}
