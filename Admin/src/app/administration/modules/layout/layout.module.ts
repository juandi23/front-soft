import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderModule } from '@modules/header/header.module';
import { HorizontalComponent } from './components/horizontal/horizontal.component';
import { HorizontaltopbarComponent } from './components/horizontaltopbar/horizontaltopbar.component';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';
import { RightsidebarComponent } from './components/rightsidebar/rightsidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SimplebarAngularModule } from '@modules/simplebar-angular/simplebar-angular.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { VerticalComponent } from './components/vertical/vertical.component';
import { UiModule } from '@modules/ui/ui.module';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    RightsidebarComponent,
    VerticalComponent,
    HorizontalComponent,
    HorizontaltopbarComponent,
  ],
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
})
export class LayoutModule {}
