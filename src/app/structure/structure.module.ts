import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FollowerDetailComponent } from '../pages/followers/follower-detail/follower-detail.component';

import { DetailTableComponent } from '../pages/users/user-detail/detail-table/detail-table.component';
import { ProfileComponent } from '../pages/users/user-detail/profile/profile.component';
import { UserDetailComponent } from '../pages/users/user-detail/user-detail.component';
import { UserListComponent } from '../pages/users/user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { StructureRoutingModule } from './structure-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    UserListComponent,
    UserDetailComponent,
    DetailTableComponent,
    ProfileComponent,
    FollowerDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StructureRoutingModule
  ]
})
export class StructureModule { }
