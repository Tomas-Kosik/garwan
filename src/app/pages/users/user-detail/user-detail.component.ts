import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumnType } from '../../../shared/enums/table-column-type.enum';
import { TableColumn } from '../../../shared/models/table-column.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public user;
  public username: string;
  public repositoryColumns: TableColumn[] = [
    { columnDef: 'name', headerDef: 'Name', columnType: TableColumnType.COLUMN },
    { columnDef: 'watchers', headerDef: 'Watchers', columnType: TableColumnType.COLUMN },
    { columnDef: 'forks', headerDef: 'Forks', columnType: TableColumnType.COLUMN },
    { columnDef: 'size', headerDef: 'Size', columnType: TableColumnType.COLUMN },
  ];
  public followersColumns: TableColumn[] = [
    { columnDef: 'actions', headerDef: 'Detail', columnType: TableColumnType.ACTION },
    { columnDef: 'avatar_url', headerDef: 'Picture', columnType: TableColumnType.IMAGE },
    { columnDef: 'login', headerDef: 'Name', columnType: TableColumnType.COLUMN },
  ];

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.getUsernameAndSetDetail();
  }

  private getUsernameAndSetDetail(): void {
    this.activatedRoute.params
      .subscribe((params) => {
        this.userService.getUser(params.username)
          .subscribe((user) => this.user = user);
      });
  }

}
