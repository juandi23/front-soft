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
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
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
