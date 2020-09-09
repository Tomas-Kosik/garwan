import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { merge, BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { fontAwesomeIcons } from '../../../shared/constants/fa-icons';
import { TableColumnType } from '../../../shared/enums/table-column-type.enum';
import { TableColumn } from '../../../shared/models/table-column.model';
import { IssueService } from '../../../shared/services/issue.service';

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss']
})
export class IssueTableComponent implements OnInit, AfterViewInit {
  @Input() username: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public dataSource: IssuesDataSource;
  public columns: TableColumn[] = [
    { columnDef: 'actions', headerDef: 'Detail', columnType: TableColumnType.ACTION },
    { columnDef: 'title', headerDef: 'Title', columnType: TableColumnType.COLUMN },
    { columnDef: 'state', headerDef: 'State', columnType: TableColumnType.COLUMN },
    { columnDef: 'comments', headerDef: 'Comments', columnType: TableColumnType.COLUMN },
    { columnDef: 'created_at', headerDef: 'Created', columnType: TableColumnType.DATE },
  ];
  public displayedColumns = [];
  public initPageSize = 5;
  public pageSizeOptions = [2, 5, 10, 20];
  public icons = fontAwesomeIcons;

  public constructor(
    public readonly issueService: IssueService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.setDisplayedColumns();
    this.dataSource = new IssuesDataSource(this.issueService);
    this.dataSource.getIssues(this.username, 0, 5, null, 'desc');
  }

  public ngAfterViewInit(): void {
    /* Reset paginator after sorting */
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    /* Get new page on Sort or Paginate events */
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.getIssuesPage())
      )
      .subscribe();
  }

  private getIssuesPage(): void {
    this.dataSource.getIssues(
      this.username,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction
    );
  }

  private setDisplayedColumns(): void {
    this.columns.forEach((column: TableColumn) => this.displayedColumns.push(column.columnDef));
  }
}

export class IssuesDataSource implements DataSource<any> {

  private issuesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public constructor(private issueService: IssueService) { }

  public connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.issuesSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.issuesSubject.complete();
    this.loadingSubject.complete();
  }

  public getIssues(username: string, page = 0, perPage = 10, sort = 'title', order = 'desc') {

    this.loadingSubject.next(true);

    this.issueService.getIssues(username, page, perPage, sort, order).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((issues) => this.issuesSubject.next(issues));
  }
}
