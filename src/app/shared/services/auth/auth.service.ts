import 'firebase/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RoutingPaths } from '../../enums/routing-path.enum';
import { StorageKeyManager } from '../../utils/storage-key-manager';
import { User } from '../../models/user.model';

const provider = new firebase.auth.GithubAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ = new BehaviorSubject<User | null>(null);
  private _clientId = '5fae922c66857fd4430d';
  private _clientSecret = '4960742759ea8a1c2bbd70f615c258a6981048df';

  public constructor(
    private readonly router: Router,
    private readonly angularFireAuth: AngularFireAuth,
  ) {
    this.setUserDuringInit();
  }

  public logInWithGithub(): void {
    this.angularFireAuth.signInWithPopup(provider)
      .then((result: any) => {
        this.mapUser(result.user, result.additionalUserInfo);
        this.router.navigate([RoutingPaths.dashboard]);
      });
  }

  public signOut(): void {
    this.angularFireAuth.signOut()
      .then(() => {
        this.router.navigate([RoutingPaths.login]);
        this.removeFromStorage();
      });
  }

  public get clientId(): string {
    return this._clientId;
  }

  public get clientSecret(): string {
    return this._clientSecret;
  }

  private mapUser(credentials: firebase.User, additionalUserInfo: any): void {
    const user = {
      uid: credentials.uid,
      name: credentials.displayName,
      screenName: additionalUserInfo.username,
      picture: credentials.photoURL,
      email: credentials.email
    };
    this.setToStorage(user);
    this.user$.next(user);
  }

  private setToStorage(user): void {
    localStorage.setItem(StorageKeyManager.USER, JSON.stringify(user));
  }

  private removeFromStorage(): void {
    localStorage.removeItem(StorageKeyManager.USER);
    this.user$.next(null);
  }

  private setUserDuringInit(): void {
    const user = JSON.parse(localStorage.getItem(StorageKeyManager.USER));
    const value = user || null;

    this.user$.next(value);
  }
}
