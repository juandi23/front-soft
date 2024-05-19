import { ActivatedRouteSnapshot } from '@angular/router';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Member } from '@models/account/member.model';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { User } from '@models/account/user.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class ProfileApiResolver implements Resolve<Member | null> {
  constructor(
    private api: CommonVerbsApiService,
    @Inject('MemberService')
    public memberService: ModelService<User>,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Member | null> {
    const id = route.params.id || route.data.id;
    if (id) {
      const includes: Map<string, any> = route.data?.includes;
      const values = includes?.get('member') ?? [];
      return this.api.get<Member>(`users/get-by-id/${id}`, {}, values).pipe(
        tap(response => {
          this.memberService.set(response);
        }),
        catchError(error => {
          this.router.navigate(['/404']).then();
          return of(null);
        })
      );
    }
    this.router.navigate(['/404']).then();
    return of(null);
  }
}
