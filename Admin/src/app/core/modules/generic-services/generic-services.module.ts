import { CommonModule } from '@angular/common';
import { ModelService } from '@services/common/model.service';
import { NgModule } from '@angular/core';
import { User } from '@models/account/user.model';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: 'UserService',
      useFactory: () => new ModelService<User>(),
    },
  ],
})
export class GenericServicesModule {}
