import { Component, Input } from '@angular/core';
import { includes, map, some } from 'lodash';

import { AuthenticationService } from '@services/account/authentication.service';
import { CommonComponent } from '@components/abstract/common-component.component';

@Component({
  selector: 'app-page-header-user-dropdown',
  templateUrl: './page-header-user-dropdown.component.html',
  styles: [],
})
export class PageHeaderUserDropdownComponent extends CommonComponent {
  @Input() landing = false;
  HEADER= 'CORE.MODULES.AUTHENTICATION.HEADER.';
  constructor(public authenticationService: AuthenticationService) {
    super();
  }

  logout() {
    this.authenticationService.logout();
  }

  support() {
    console.log('support');
  }
}
