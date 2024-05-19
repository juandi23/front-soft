import { Event } from '../../models/layout/event.model';
import { EventCallback } from '../../models/layout/event.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable()
export class EventService {
  private handler = new Subject<Event>();

  broadcast(type: string, payload = {}) {
    this.handler.next({ type, payload });
  }

  /**
   * Subscribe to event
   * @param type type of event
   * @param callback call back function
   */
  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler
      .pipe(filter(event => event.type === type))
      .pipe(map(event => event.payload))
      .subscribe(callback);
  }
}
