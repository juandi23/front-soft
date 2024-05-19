import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@services/account/authentication.service';
import { CommonApiService } from '@services/common/common-api.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '@services/layout/theme-service.service';
import { LanguageService } from '@services/layout/language.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'users' },
    CommonApiService,
    LanguageService
  ],
})
export class VerificationComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService, private api: CommonApiService, private toastr: ToastrService,private themeService: ThemeService, public languaService:LanguageService ) { }
  // set the currenr year
  year: number = new Date().getFullYear();
  mode:string;
  TRANSLATE_KEY= 'ACCOUNT.AUTH.VERIFICATION.'
  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg')
    const modeAttribute = this.themeService.getTheme();
    this.mode= modeAttribute !== '' ? modeAttribute : 'light';
  }

  resend(){
    this.api.get<{message: string}>(`/${this.authenticationService.authService.model.id}/send-email-confirmation`).subscribe(e => {
      if(e){
        this.toastr.success(e?.message ?? 'Exito.');
      }
    })
  }

}
