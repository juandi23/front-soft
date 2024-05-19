import { CommonModule } from '@angular/common';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { FormsModule } from '@angular/forms';
import { ModelService } from '@services/common/model.service';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { PasswordPageComponent } from './pages/password-page/password-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@modules/ui/ui.module';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [FormPageComponent, DetailPageComponent, PasswordPageComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    NgSelectModule,
    TranslateModule,
  ],
  providers: [
  ]
})
export class ProfileModule {}
