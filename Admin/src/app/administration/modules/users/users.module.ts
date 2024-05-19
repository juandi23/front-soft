import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiInterceptor } from '@interceptors/api.interceptor';
import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './pages/detail-page/detail-page.component'
import { FormPageComponent } from './pages/form-page/form-page.component';
import { FormsModule } from '@angular/forms';
import { GeneralFormComponent } from './components/general-form/general-form.component';
import { GenericServicesModule } from '@modules/generic-services/generic-services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ModelService } from '@services/common/model.service';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { Role } from '@models/account/role.model';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@modules/ui/ui.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    ListPageComponent,
    FormPageComponent,
    GeneralFormComponent,
    DetailPageComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    CommonModule,
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
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    {
      provide: 'RolesService',
      useFactory: () => new ModelService<Role[]>(),
    },
  ],
})
export class UsersModule {}
