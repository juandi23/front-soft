import { Account } from '@models/account/account.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private subject$: ReplaySubject<Account> = new ReplaySubject<Account>(1);
  readonly model$: Observable<Account> = this.subject$.asObservable();
  private state!: Account;

  isLoading = false;

  get account(): Account {
    return this.state;
  }

  set(model: Account) {
    this.state = model;
    this.subject$.next(this.state);
  }
}
