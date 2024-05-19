import { AuthenticationService } from '@services/account/authentication.service';
import { CommonComponent } from '@components/abstract/common-component.component';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { LanguageService } from '@services/layout/language.service';
import { MenuItem } from '@models/layout/menu.model';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';

@Component({ template: '' })
export abstract class BaseTopBarComponent
  extends CommonComponent
  implements OnInit
{
  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  element: any;
  flagValue = '';
  cookieValue = '';
  countryName = '';
  valueSet = '';
  hasMegaMenu = false;
  hasShortLinks = false;

  isLoggedIn = false;


  constructor(
    @Inject(DOCUMENT) private document: any,
    protected router: Router,
    public languageService: LanguageService,
    public cookiesService: CookieService,
    public authenticationService: AuthenticationService
  ) {
    super();
    this.element = document.documentElement;
    this.cookieValue = this.cookiesService.get('lang');
  }

  ngOnInit(): void {
    this.authenticationService.isLoggedIn().then(next => {
      this.isLoggedIn = next;
      if (this.isLoggedIn) {
        const subscribe = of(this.authenticationService.authService.model)
          .pipe(
            switchMap(data =>
              data ? of(data) : this.authenticationService.getAccount()
            )
          )
          .subscribe(response => {
            if (response) {
              this.authenticationService.authService.set(response);
            } else {
              this.authenticationService.logout();
            }
          });
        this.unsubscribe.push(subscribe);
      }
    });


  }

  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagValue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  toggleMenubar() {
    const element = document.getElementById('topnav-menu-pages');
    element?.classList.toggle('show');
  }

  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }

  onMenuClick(event: any) {
    const nextEl = event.target.nextElementSibling;
    if (nextEl) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove('show');
      }
      nextEl.classList.toggle('show');
    }
    return false;
  }

  logout() {
    this.authenticationService.logout();
    // this.router.navigate(['/']).then();
  }

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
}
