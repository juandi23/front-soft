import { LayoutComponent } from './modules/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then(
            m => m.UsersModule
          ),
          canActivate: [AuthGuard, RoleGuard],
          data: { roles: ['ADMIN'] }
      },

    ]
  },
  {
    path: 'psicologia',
    loadChildren: () =>
      import('./modules/psychological-interview/psychological-interview.module').then(
        m => m.PsychologicalInterviewModule
      ),

  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'seleccion'
        , loadChildren: () =>
          import('./modules/selection-hiring/selection-hiring.module').then(
            m => m.SelectionHiringModule
          ),
      },

    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
