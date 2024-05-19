import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbAccordionModule, NgbModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ApiInterceptor } from '@interceptors/api.interceptor';
import { AppComponent } from './app.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ErrorInterceptor } from '@interceptors/error.interceptor';
import { ExtrapagesModule } from '../extrapages/extrapages.module';
import { MenuItem } from '@models/layout/menu.model';
import { ModelService } from '@services/common/model.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { User } from '@models/account/user.model';
import { environment } from '../../environments/environment';
import { CommonApiService } from '@services/common/common-api.service';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ApplicationRoutingModule,
    ExtrapagesModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    ScrollToModule.forRoot(),
    NgbModule,
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' }),
    ToastrModule.forRoot({ closeButton: true, progressBar: true }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'API_URL', useValue: environment.api },
    {
      provide: 'AuthService',
      useFactory: () => new ModelService<User>(),
    },
    {
      provide: 'MenuService',
      useFactory: () => new ModelService<MenuItem[]>(),
    },
  ],
})
export class ApplicationModule { }
