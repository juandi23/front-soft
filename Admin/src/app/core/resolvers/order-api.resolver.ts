import { ActivatedRouteSnapshot } from '@angular/router';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs';
import { Order } from '@models/orders/order.model';

@Injectable()
export class OrderApiResolver implements Resolve<Order | null> {
  constructor(
    @Inject('OrderService')
    public ordersService: ModelService<Order>,
    private service: CommonVerbsApiService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order | null> {
    const id = route.params.id || route.data.id;
    return this.service
      .get<Order>(`orders/${id}`, {}, [])
      .pipe(
        tap(response => {
          this.ordersService.set(response);
        }),
        catchError(error => {
          this.router.navigate(['/404']).then();
          return of(null);
        })
      );
  }
}
