import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychologicalInterviewRoutingModule } from './psychological-interview-routing.module';
import { EditComponent } from './pages/edit/edit.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    EditComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PsychologicalInterviewRoutingModule
  ]
})
export class PsychologicalInterviewModule { }
