import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@services/layout/theme-service.service';
import { AuthenticationService } from '@services/account/authentication.service';
import { LanguageService } from '@services/layout/language.service';

@Component({
  selector: 'app-confirmmail',
  templateUrl: './confirmmail.component.html',
  styleUrls: ['./confirmmail.component.scss'],
  providers:[  LanguageService]
})
export class ConfirmmailComponent implements OnInit {
  // set the currenr year
  mode: string;
  year: number = new Date().getFullYear();
  constructor(public authenticationService: AuthenticationService,  private themeService: ThemeService,
    languageService: LanguageService
  ) { }

  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

}
