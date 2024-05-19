import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';
import { ProfileApiResolver } from '@resolvers/profile-api.resolver';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/profile/profile.module').then(m => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
