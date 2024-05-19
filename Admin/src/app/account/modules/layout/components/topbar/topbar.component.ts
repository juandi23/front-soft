import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { BaseTopBarComponent } from '@components/abstract/base-top-bar.component';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { LanguageService } from '@services/layout/language.service';
import { MenuItem } from '@models/layout/menu.model';
import { OnInit } from '@angular/core';
import { Member } from '@models/account/member.model';
import { Router } from '@angular/router';
import { EventService } from '@services/layout/event.service';
import { ThemeService } from '@services/layout/theme-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent extends BaseTopBarComponent implements OnInit {
  member: Member = this.route.snapshot.data.user;
  memberMenu = this.route.snapshot.data.memberMenu ?? false;

  menuItems: MenuItem[] = [];
  attribute: string;
  mode: string;
  TRANSLATE_KEY = 'ACCOUNT.MODULES.LAYOUT.COMPONENTS.TOPBAR.';

  constructor(
    @Inject(DOCUMENT) document: InjectionToken<Document>,
    router: Router,
    languageService: LanguageService,
    cookiesService: CookieService,
    authenticationService: AuthenticationService,
    private route: ActivatedRoute,
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
    this.attribute = this.themeService.getLayout();
    const modeAttribute = this.themeService.getTheme();
    this.themeService.setTheme(modeAttribute !== '' ? modeAttribute : 'light');
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
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
