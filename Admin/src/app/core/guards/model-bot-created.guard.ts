import { Observable, map } from 'rxjs';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EntityCreatedGuard implements CanActivate {
  constructor(private router: Router, private service: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const model = this.service.authService.model;
    const userRoles = model?.roles;
    if (route.data.key === 'modelBot') {
      if (!model.modelBot && userRoles) {
        if (userRoles.some(role => route.data.roles.includes(role.name))) {
          return true;
        } else {
          this.router
            .navigate(['/404'])
            .then();
          return false;
        }
      } else {
        this.router
          .navigate(['/404'])
        return false;
      }
    } else if (route.data.key === 'tenant') {
      if (model.tenants.length === 0 && userRoles) {
        if (userRoles.some(role => route.data.roles.includes(role.name))) {
          return true;
        } else {
          this.router
            .navigate(['/404'])
            .then();
          return false;
        }
      } else {
        this.router
          .navigate(['/404'])
        return false;
      }
    }
  }
}
