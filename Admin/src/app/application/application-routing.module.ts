import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Page404Component } from '../extrapages/page404/page404.component';
import { RoleGuard } from '../core/guards/role.guard';
import { UserPivotGuard } from '../core/guards/user-pivot.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('../administration/administration.module').then(
        m => m.AdministrationModule
      )
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../account/account.module').then(m => m.AccountModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../web-site/web-site.module').then(m => m.WebSiteModule),
  },
  {
    path: '404',
    component: Page404Component,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class ApplicationRoutingModule { }
