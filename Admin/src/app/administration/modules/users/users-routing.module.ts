import { DetailPageComponent } from './pages/detail-page/detail-page.component'
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: ListPageComponent,
  },
  {
    path: 'forms',
    children: [
      {
        path: '',
        component: FormPageComponent,
      },
      {
        path: ':id',
        component: FormPageComponent,
      },
    ],
  },
  {
    path: 'detail',
    children: [
      {
        path: ':id',
        component: DetailPageComponent,

        children: [],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
