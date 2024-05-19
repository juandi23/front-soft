import { Component, OnDestroy } from '@angular/core';
import { ThemeService } from '@services/layout/theme-service.service';
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnDestroy {
  TRANSLATE_KEY='WEB-SITE.PAGES.PRIVACY-POLICY.';
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
