import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { RoutingPaths } from '../../enums/routing-path.enum';

import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

const provider = new firebase.auth.GithubAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User | null>;
  private clientId = '5fae922c66857fd4430d';
  private clientSecret = '4960742759ea8a1c2bbd70f615c258a6981048df';
  private _token;

  public constructor(
    private readonly router: Router,
    private readonly angularFireAuth: AngularFireAuth,
    private readonly httpClient: HttpClient,
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

  public get token() {
    return this._token;
  }

  public set token(token: string) {
    this._token = token;
  }

  public getClientId(): string {
    return this.clientId;
  }

  public getClientSecret(): string {
    return this.clientSecret;
  }

  private mapUser(credentials: firebase.User): Observable<User> {
    return this.httpClient.get(`https://api.github.com/user?access_token=${this.token}`)
      .pipe(
        map((user: any) => {
          return {
            uid: credentials.uid,
            name: credentials.displayName,
            screenName: user.login,
            picture: credentials.photoURL,
            email: credentials.email
          };
        })
      );
  }
}
