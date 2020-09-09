import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Endpoint } from '../enums/endpoint.enum';
import { User } from '../models/user.model';
import { EndpointManager } from '../utils/endpoint-manager';
import { HttpManager } from '../utils/http.manager';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpManager {
  public usersUrl = EndpointManager.getSearchEndpointPrefix(Endpoint.USERS);
  public userUrl = EndpointManager.getBrowseEndpointPrefix(Endpoint.USERS);
  public credentials = `&client_id=${this.authService.clientId}&client_secret=${this.authService.clientSecret}`;
  public totalElements = 0;

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) {
    super();
  }

  public getUsers(page: number, perPage: number, sort: string, order: string, location: string): Observable<any> {
    return this.httpClient.get(
      `${this.usersUrl}?q=${encodeURIComponent(`location:${location || 'bratislava'}`)}`,
      {
        headers: this.getHeader(),
        params: new HttpParams()
          .set('page', (page + 1).toString())
          .set('per_page', perPage.toString())
          .set('sort', sort)
          .set('order', order)
          .set('client_id', this.authService.clientId)
          .set('client_secret', this.authService.clientSecret)
      }
    ).pipe(
      map((data: any) => {
        this.totalElements = data.total_count;
        return data;
      }),
      switchMap(
        (data: any) => {
          const usersDetail$ = data.items.map(user => {
            return this.httpClient.get(`${user.url}?${this.credentials}`)
              .pipe(catchError(error => of(error)));
          });

          return forkJoin(usersDetail$);
        }
      )
    );
  }

  public getUser(username: string): Observable<User> {
    return this.httpClient.get(
      `${this.userUrl}/${username}?${this.credentials}`,
      { headers: this.getHeader() }
    );
  }
}
