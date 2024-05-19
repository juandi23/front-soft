import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LayoutComponent } from '../layout/layout.component';
import { MemberApiResolver } from '@resolvers/member-api.resolver';
import { NgModule } from '@angular/core';
import { PasswordPageComponent } from './pages/password-page/password-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: LayoutComponent,
    resolve: {
      user: MemberApiResolver,
    },
    data: {
      residentMenu: false,
    },
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: DetailPageComponent,
          },
          {
            path: 'password',
            component: PasswordPageComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
