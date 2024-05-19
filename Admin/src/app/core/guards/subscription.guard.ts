import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { User } from '@models/account/user.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionGuard implements CanActivate {
  constructor(private router: Router, private service: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const model = this.service.authService.model;
    if (model.subscription) {
      const hoy = new Date();
      const startDate = new Date(model.subscription.createdAt);
      const monthLater = new Date(startDate);
      monthLater.setMonth(startDate.getMonth() + 1);
      if (route.data?.active === true) {
        if (hoy >= startDate || hoy <= monthLater) {
          return true;
        } else {
          this.router
            .navigate(['/404'])
            .then();
          return false;
        }
      } else {
        if (hoy >= startDate || hoy <= monthLater) {
          this.router
            .navigate(['/404'])
            .then();
          return false;
        } else {
          return true;
        }
      }
    } else {
      if (route.data?.active === true) {
        this.router
          .navigate(['/404'])
          .then();
        return false;
      }
      return true;
    }
  }
}
