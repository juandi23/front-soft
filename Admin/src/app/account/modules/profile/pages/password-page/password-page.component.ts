import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonFormComponent } from '@components/abstract/common-form.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { MenuItem } from '@models/layout/menu.model';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder } from '@angular/forms';
import { User } from '@models/account/user.model';
import { checkPasswords } from '@functions/forms';

@Component({
  selector: 'app-password-page',
  templateUrl: './password-page.component.html',
  styles: [],
})
export class PasswordPageComponent
  extends CommonFormComponent<User, User>
  implements OnInit
{
  TRANSLATE_KEY = 'ACCOUNT.MODULES.PROFILE.PAGES.PASSWORD.';
  user: User = this.route.snapshot.data.user;
  menuAccountItems: Array<{}> = [
    {
      label: 'Profile',
      active: true,
    },
    {
      label: 'Edit Account Settings',
      active:false,
      route: '../'
    },
    {
      label: 'Change Password',
      active: true,
    },
  ];
  constructor(
    builder: UntypedFormBuilder,
    api: CommonVerbsApiService,
    toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    super(builder, api, toastr, `users/update-password`);

    this.group = this.builder.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        passwordConfirmation: [null, [Validators.required]],
      },
      { validators: checkPasswords }
    );
  }

  ngOnInit(): void {
    this.isCreateSubject$.next(true);
  }

  get f() {
    return this.group.controls;
  }


}


