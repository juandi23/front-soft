import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { EventService } from '@services/layout/event.service';
import { LayoutModule } from './modules/layout/layout.module';
import { MemberApiResolver } from '@resolvers/member-api.resolver';
import { ModelService } from '@services/common/model.service';
import { NgModule } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileApiResolver } from '@resolvers/profile-api.resolver';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { User } from '@models/account/user.model';
import { lang } from 'moment';
import { LanguageService } from '@services/layout/language.service';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [ResetPasswordPageComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    TranslateModule,
  ],
  providers: [
    LanguageService,
    EventService,
    CommonVerbsApiService,
    ProfileApiResolver,
    MemberApiResolver,
    {
      provide: 'MemberService',
      useFactory: () => new ModelService<User>(),
    },
  ]
})
export class AccountModule { }
