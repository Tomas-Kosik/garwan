import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { fontAwesomeIcons } from '../../../../shared/constants/fa-icons';
import { Endpoint } from '../../../../shared/enums/endpoint.enum';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { EndpointManager } from '../../../../shared/utils/endpoint-manager';
import { HttpManager } from '../../../../shared/utils/http.manager';

@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss']
})
export class DetailTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() user;
  @Input() suffix: string;
  @Input() resultsLength = 0;
  @Input() columns: TableColumn[];

  public dataSource: any[] = [];
  public displayedColumns = [];
  public DetailTableDatabase: DetailTableDatabase | null;

  public isLoadingResults = true;
  public isRateLimitReached = false;
  public defaultPageSize = 5;
  public pageSizeOptions = [2, 5, 10];
  public icons = fontAwesomeIcons;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.setDisplayedColumns();
  }

  public ngAfterViewInit(): void {
    this.DetailTableDatabase = new DetailTableDatabase(this.httpClient, this.authService);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.loadData();
  }

  public showDetail(row: string): void {
    this.router.navigate([`dashboard/follower/${row}`]);
  }

  private loadData(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.DetailTableDatabase.getRepoIssues(
            `${this.user.login}${this.suffix}`,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe((data: any[]) => this.dataSource = data);
  }

  private setDisplayedColumns(): void {
    this.columns.forEach((column: TableColumn) => this.displayedColumns.push(column.columnDef));
  }
}

export class DetailTableDatabase extends HttpManager {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {
    super();
  }

  getRepoIssues(
    login: string,
    sort: string,
    order: string,
    pageIndex: number,
    pageSize: number,
  ): Observable<any> {
    return this.httpClient.get<Observable<any>>(
      `${EndpointManager.getBrowseEndpointPrefix(Endpoint.USERS)}/${login}`,
      {
        headers: this.getHeader(),
        params: new HttpParams()
          .set('page', (pageIndex + 1).toString())
          .set('per_page', pageSize.toString())
          .set('sort', sort)
          .set('direction', order)
          .set('client_id', this.authService.clientId)
          .set('client_secret', this.authService.clientSecret)
      }
    );
  }
}
