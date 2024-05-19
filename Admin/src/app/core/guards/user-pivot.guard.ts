import { Observable, map } from 'rxjs';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserPivotGuard implements CanActivate {
  constructor(private router: Router, private service: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.getAccount().pipe(
      map(model => {
        this.service.authService.set(model);
        return true;
      })
    );
  }
}
