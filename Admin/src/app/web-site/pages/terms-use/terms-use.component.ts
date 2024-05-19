import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '@services/layout/theme-service.service';
@Component({
  selector: 'app-terms-use',
  templateUrl: './terms-use.component.html',
  styleUrls: ['./terms-use.component.scss']
})
export class TermsUseComponent implements OnDestroy {
  TRANSLATE_KEY='WEB-SITE.PAGES.TERMS-USE.';
  mode:string;
  constructor(private themeService:ThemeService) { }
  ngOnInit(): void {
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

  ngOnDestroy(){
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-layout');
  }
}
