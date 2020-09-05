import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoint } from '../enums/endpoint.enum';
import { EndpointManager } from '../utils/endpoint-manager';
import { HttpManager } from '../utils/http.manager';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpManager {
  public url = EndpointManager.getEndpointPrefix(Endpoint.USERS);

  public constructor(
    private readonly httpClient: HttpClient
  ) {
    super();
  }

  public getUsers(location: string = 'Bratislava'): Observable<any> {
    return this.httpClient.get(
      `${this.url}?q=location:${location}`,
      { headers: this.getHeader() }
    ).pipe(
      map((data: any) => data.items.map(
        (user) => {
          return {
            name: user.login,
            picture: user.avatar_url,
            repositories: 10,
            followers: 30
          };
        }
      )),
    );
  }
}
