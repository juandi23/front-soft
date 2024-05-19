import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NgModule } from '@angular/core';
import { ProductResolver } from '@resolvers/product.resolver';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
