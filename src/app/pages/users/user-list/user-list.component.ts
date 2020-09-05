import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../../shared/models/user.model';

import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  public listData: MatTableDataSource<User>;
  public staticColumns = ['actions', 'picture'];
  public dynamicColumns = ['name', 'repositories', 'followers'];
  public displayedColumns = [...this.staticColumns, ...this.dynamicColumns];
  public keyUpSubscription: Subscription;

  public errorMessage: string;
  public loading = false;
  public debouncingTime = 1000;
  public icons = {
    chevronRight: faChevronRight
  };

  public constructor(
    private readonly userService: UserService
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.getUsers();
    this.keyUpSubscription = fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.debouncingTime),
        map((event: Event) => (event.target as HTMLInputElement).value),
        distinctUntilChanged(),
        tap(() => this.loading = true),
        switchMap((filterValue) => this.userService.getUsers(filterValue)
          .pipe(finalize(() => this.loading = false))
        ),
      )
      .subscribe(
        (data) => this.handleSubscription(data),
        (error) => this.errorMessage = error.error.message
      );
  }

  public ngOnDestroy(): void {
    this.keyUpSubscription.unsubscribe();
  }

  public getUsers(): void {
    this.userService.getUsers()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (data) => this.handleSubscription(data),
        (error) => this.errorMessage = error.error.message
      );
  }

  public showDetail(row): void {
    console.log('Row: ', row);
  }

  private handleSubscription(data): void {
    this.listData = new MatTableDataSource(data);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;
  }
}
