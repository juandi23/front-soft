import { CommonApiService } from '@services/common/common-api.service';
import { CommonComponent } from '@components/abstract/common-component.component';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { OnInit } from '@angular/core';
import { User } from '@models/account/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent extends CommonComponent implements OnInit {
  userDetail: User = <User>{};
  TRANSLATE_KEY= 'ADMIN.USERS.COMPONENTS.USER.';
  constructor(
    @Inject('UserService')
    public userService: ModelService<User>,
    public api: CommonApiService
  ) {
    super();
  }

  ngOnInit(): void {
    const subscribe = this.userService.model$.subscribe(value => {
      if (value != null) {
        this.load(value);
      }
    });
    this.unsubscribe.push(subscribe);
  }

  private load(model: User) {
    this.userDetail = model;
  }
}
