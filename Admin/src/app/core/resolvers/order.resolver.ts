import { ActivatedRouteSnapshot } from '@angular/router';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ModelService } from '@services/common/model.service';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Order } from '@models/orders/order.model';

@Injectable()
export class OrderResolver implements Resolve<Order> {
  constructor(
    @Inject('OrderService')
    private service: ModelService<Order>,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order> {
    return this.service.model$.pipe(
      //debounceTime(200),
      filter(x => x !== null && x !== undefined),
      map(r => r!)
    );
  }
}
