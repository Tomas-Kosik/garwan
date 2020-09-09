import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FollowerDetailComponent } from '../pages/followers/follower-detail/follower-detail.component';
import { ProfileComponent } from '../pages/users/user-detail/profile/profile.component';
import { UserDetailComponent } from '../pages/users/user-detail/user-detail.component';
import { UserListComponent } from '../pages/users/user-list/user-list.component';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'follower/:username',
        component: FollowerDetailComponent
      },
      {
        path: 'my-profile/:username',
        component: UserDetailComponent,
        data: {
          currentUser: true
        },
        canActivate: [AuthGuard]
      },
      {
        path: ':username',
        component: UserDetailComponent,
        data: {
          currentUser: false
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureRoutingModule { }
