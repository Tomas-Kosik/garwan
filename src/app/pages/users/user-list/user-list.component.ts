import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { fontAwesomeIcons } from '../../../shared/constants/fa-icons';

import { TableColumnType } from '../../../shared/enums/table-column-type.enum';
import { TableColumn } from '../../../shared/models/table-column.model';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('location') location: ElementRef;

  public dataSource: UsersDataSource;
  public columns: TableColumn[] = [
    { columnDef: 'actions', headerDef: 'Detail', columnType: TableColumnType.ACTION },
    { columnDef: 'avatar_url', headerDef: 'Picture', columnType: TableColumnType.IMAGE },
    { columnDef: 'login', headerDef: 'Name', columnType: TableColumnType.COLUMN },
    { columnDef: 'public_repos', headerDef: 'Repositories', columnType: TableColumnType.COLUMN },
    { columnDef: 'followers', headerDef: 'Followers', columnType: TableColumnType.COLUMN },
    { columnDef: 'created_at', headerDef: 'Created', columnType: TableColumnType.DATE },
  ];
  public displayedColumns = [];
  public debouncingTime = 1000;
  public initPageSize = 5;
  public pageSizeOptions = [2, 5, 10, 20];
  public icons = fontAwesomeIcons;

  public constructor(
    public readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.setDisplayedColumns();
    this.dataSource = new UsersDataSource(this.userService);
    this.dataSource.getUsers(0, 5, 'followers', 'desc');
  }

  public ngAfterViewInit(): void {
    /* Filtering/searching on server side */
    fromEvent(this.location.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.debouncingTime),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getUsersPage();
        })
      )
      .subscribe();

    /* Reset paginator after sorting */
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    /* Get new page on Sort or Paginate events */
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.getUsersPage())
      )
      .subscribe();
  }

  public showDetail(row): void {
    this.router.navigate([row], { relativeTo: this.activatedRoute });
  }

  private getUsersPage(): void {
    const location = this.location.nativeElement.value.trim().toLowerCase();
    this.dataSource.getUsers(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      location
    );
  }

  private setDisplayedColumns(): void {
    this.columns.forEach((column: TableColumn) => this.displayedColumns.push(column.columnDef));
  }
}

export class UsersDataSource implements DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public constructor(private userService: UserService) { }

  public connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
  }

  public getUsers(page = 0, perPage = 10, sort = 'followers', order = 'desc', location = 'Bratislava') {

    this.loadingSubject.next(true);

    this.userService.getUsers(page, perPage, sort, order, location).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe((users) => this.usersSubject.next(users));
  }
}
