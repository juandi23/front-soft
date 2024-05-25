import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionHiringRoutingModule } from './selection-hiring-routing.module';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    EditFormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SelectionHiringRoutingModule
  ]
})
export class SelectionHiringModule { }
