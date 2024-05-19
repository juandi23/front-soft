import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  theme$ = this.themeSubject.asObservable();

  private layoutSubject = new BehaviorSubject<string>('horizontal');
  layout$ = this.layoutSubject.asObservable();

  constructor(private cookieService: CookieService) {
    const savedTheme = this.cookieService.get('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }

    const savedLayout = this.cookieService.get('layout');
    if (savedLayout) {
      this.setLayout(savedLayout);
    }
  }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    document.body.setAttribute('data-layout-mode', theme);
    this.cookieService.set('theme', theme);
  }

  getTheme() {
    return this.themeSubject.value;
  }

  getThemeSubject() {
    return this.themeSubject;
  }

  setLayout(layout: string) {
    this.layoutSubject.next(layout);
    this.cookieService.set('layout', layout);
  }

  getLayout() {
    return this.layoutSubject.value;
  }
}
