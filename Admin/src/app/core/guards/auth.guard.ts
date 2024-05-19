import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.service
      .isAuthenticated()
      .pipe(
        tap(isAuthenticated => this.handleAuthorization(isAuthenticated, state))
      );
  }

  private handleAuthorization(
    isAuthenticated: boolean,
    state: RouterStateSnapshot
  ) {
    if (!isAuthenticated) {
      this.router
        .navigate(['/account/auth/login-2'], {
          queryParams: {
            returnUrl: state.url,
          },
        })
        .then();
    }
  }
}
