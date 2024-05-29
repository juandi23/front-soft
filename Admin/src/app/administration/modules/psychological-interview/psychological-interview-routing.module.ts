import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'forms',
    children: [
      {
        path: '',
        component: FormComponent,
      },
      {
        path: ':id',
        component:  FormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PsychologicalInterviewRoutingModule { }
