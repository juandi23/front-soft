import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({ template: '' })
export abstract class CommonComponent implements OnDestroy {
  protected unsubscribe: Subscription[] = [];
  protected destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => {
      sb.unsubscribe();
    });
    this.destroy$.next();
    this.destroy$.complete();
  }
}
