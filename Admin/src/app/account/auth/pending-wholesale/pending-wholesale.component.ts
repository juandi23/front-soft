import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/auth.service';
import { LanguageService } from '@services/layout/language.service';
import { ThemeService } from '@services/layout/theme-service.service';

@Component({
  selector: 'app-pending-wholesale',
  templateUrl: './pending-wholesale.component.html',
  styleUrls: ['./pending-wholesale.component.scss'],
  providers: [  LanguageService]
})
export class PendingWholesaleComponent {
  mode: string;
  year: number = new Date().getFullYear();
  constructor(public authenticationService: AuthenticationService,  private themeService: ThemeService,
    languageService: LanguageService,
   public router: Router
  ) { }

  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

}
