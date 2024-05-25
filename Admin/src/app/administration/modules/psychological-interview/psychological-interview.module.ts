import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PsychologicalInterviewRoutingModule } from './psychological-interview-routing.module';

import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiInterceptor } from '@interceptors/api.interceptor';
import { FormsModule } from '@angular/forms';
import { GenericServicesModule } from '@modules/generic-services/generic-services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModelService } from '@services/common/model.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@modules/ui/ui.module';
import { EditComponent } from './components/edit/edit.component';



@NgModule({
  declarations: [
    EditComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PsychologicalInterviewRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbNavModule,
    HttpClientJsonpModule,
    HttpClientModule,
    UiModule,
    NgbModule,
    GenericServicesModule,
    TranslateModule,

  ]
})
export class PsychologicalInterviewModule { }
