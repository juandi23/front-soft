import { Component, OnInit } from '@angular/core';
import { LanguageService } from '@services/layout/language.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-translate-button',
  templateUrl: './translate-button.component.html',
  styleUrls: ['./translate-button.component.scss']
})
export class TranslateButtonComponent implements OnInit {
  flagValue: string = '';
  cookieValue: string = '';
  countryName: string = '';
  valueSet: string = '';
  listLang = [
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
  ];

  constructor(
    private languageService: LanguageService,
    private cookiesService: CookieService,
  ) {}

  ngOnInit(): void {
    this.cookieValue = this.cookiesService.get('lang');
    const val = this.listLang.find(x => x.lang === this.cookieValue);
    if (val) {
      this.countryName = val.text;
      this.flagValue = val.flag;
    } else {
      this.valueSet = 'assets/images/flags/us.jpg';
    }
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagValue = flag;
    this.cookieValue = lang;
    this.cookiesService.set('lang', lang);
    this.languageService.setLanguage(lang);
  }
}
