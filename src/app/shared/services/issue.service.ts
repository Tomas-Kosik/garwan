import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Endpoint } from '../enums/endpoint.enum';
import { EndpointManager } from '../utils/endpoint-manager';
import { HttpManager } from '../utils/http.manager';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends HttpManager {
  public issuesUrl = EndpointManager.getSearchEndpointPrefix(Endpoint.ISSUES);
  public totalElements = 0;

  public constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
  ) {
    super();
  }

  public getIssues(username: string, page: number, perPage: number, sort: string, order: string): Observable<any> {
    return this.httpClient.get(
      `${this.issuesUrl}?q=${encodeURIComponent(`user:${username}`)}`,
      {
        headers: this.getHeader(),
        params: new HttpParams()
          .set('page', (page + 1).toString())
          .set('per_page', perPage.toString())
          .set('sort', sort)
          .set('direction', order)
          .set('client_id', this.authService.clientId)
          .set('client_secret', this.authService.clientSecret)
      }
    ).pipe(
      map((data: any) => {
        this.totalElements = data.total_count;
        return data.items;
      })
    );
  }
}
