import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CommonModule } from '@angular/common';
import { EventService } from '@services/layout/event.service';
import { LayoutModule } from './modules/layout/layout.module';
import { LightboxModule } from 'ngx-lightbox';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UiModule } from '@modules/ui/ui.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { WidgetModule } from '@modules/widget/widget.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    NgApexchartsModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbDropdownModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    UiSwitchModule,
    NgbModule,
    UiModule,
    WidgetModule,
    LayoutModule,
    LightboxModule
  ],
  providers: [EventService],
})
export class AdministrationModule {}
