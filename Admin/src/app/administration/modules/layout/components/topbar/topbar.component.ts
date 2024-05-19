import { AuthenticationService } from '@services/account/authentication.service';
import { BaseTopBarComponent } from '@components/abstract/base-top-bar.component';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { EventService } from '@services/layout/event.service';
import { Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { LanguageService } from '@services/layout/language.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '@services/layout/theme-service.service';
import { MenuItem } from '@models/layout/menu.model';
import { dataModules } from '@database/administration-modules';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  providers: [LanguageService],
})
export class TopbarComponent extends BaseTopBarComponent implements OnInit {
  attribute: string;
  mode: string;
  menuItems: MenuItem[] = dataModules;
  TRANSLATE_KEY = 'ADMIN.LAYOUT.COMPONENTS.TOPBAR.';
  constructor(
    @Inject(DOCUMENT) document: InjectionToken<Document>,
    router: Router,
    languageService: LanguageService,
    cookiesService: CookieService,
    authenticationService: AuthenticationService,
    private eventService: EventService,
    private themeService: ThemeService
  ) {
    super(
      document,
      router,
      languageService,
      cookiesService,
      authenticationService
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const attributeAux = this.themeService.getLayout();;
    this.attribute = attributeAux !== '' ? attributeAux : 'horizontal';
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
    const readUserRole = this.authenticationService.authService.model.roles.find(e => e.name === 'MARKETER_USER');
    if(readUserRole && this.authenticationService.authService.model.roles.length === 1){
      this.menuItems = this.menuItems.filter(item => {
        if (item.label === 'Marketing') {
          return true;
        } else if (item.subItems) {
          item.subItems = item.subItems.filter(subItem => subItem.label === 'Company Modules');
          return item.subItems.length > 0;
        }
        return false;
      });
    }
  }

  changeMode(themeMode: string) {
    this.mode = themeMode;
    this.themeService.setTheme(themeMode);
  }

  changeLayout() {
    this.themeService.setLayout('horizontal');
    this.eventService.broadcast('changeLayout', 'horizontal');
  }
}
