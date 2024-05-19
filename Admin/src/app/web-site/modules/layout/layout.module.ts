import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderModule } from '@modules/header/header.module';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SimplebarAngularModule } from '@modules/simplebar-angular/simplebar-angular.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { UiModule } from '@modules/ui/ui.module';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, TopbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    HeaderModule,
    UiModule,
    NgbAccordionModule
  ],
  exports: [FooterComponent, TopbarComponent],
})
export class LayoutModule {}
