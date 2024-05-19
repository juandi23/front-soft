import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageEmitterService {
  private subject = new Subject<{type:string, data: any}>();

  emitEvent(event: {type:string, data: any}) {
    this.subject.next(event);
  }

  getEvent() {
    return this.subject.asObservable();
  }
}
