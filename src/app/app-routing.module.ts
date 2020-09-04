import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RoutingPaths } from './shared/enums/routing-path.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutingPaths.login,
    pathMatch: 'full'
  },
  {
    path: RoutingPaths.login,
    component: LoginComponent
  },
  {
    path: RoutingPaths.dashboard,
    loadChildren: (): Promise<any> => import('./structure/dashboard/dashboard.module').then((mod: any) => mod.DashboardModule)
  },
  {
    path: '**',
    redirectTo: RoutingPaths.login
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
