import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonFormComponent } from '@components/abstract/common-form.component';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { MenuItem } from '@models/layout/menu.model';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormBuilder } from '@angular/forms';
import { User } from '@models/account/user.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styles: [],
})
export class DetailPageComponent

  extends CommonFormComponent<User, User>
  implements OnInit
{
  user: User = this.route.snapshot.data.user;
  menuAccountItems: Array<{}> = [
    { label: 'Profile', active: true },
    { label: 'Edit Account Settings', active: true,},
  ];
  isSubscribed = false;
  TRANSLATE_KEY = 'ACCOUNT.MODULES.PROFILE.PAGES.DETAIL.';
  constructor(
    builder: UntypedFormBuilder,
    api: CommonVerbsApiService,
    toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    super(builder, api, toastr, `users`);

    this.group = this.builder.group({
      id: [this.user.id, [Validators.required]],
      email: [
        this.user.email,
        [Validators.required, Validators.email],
      ],
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.minLength(3)],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.minLength(3)],
      ],
      preferredName: [this.user.profile?.preferredName],
      about: [this.user.profile?.about],
    });
  }

  ngOnInit(): void {
    this.isCreateSubject$.next(false);
  }
}
