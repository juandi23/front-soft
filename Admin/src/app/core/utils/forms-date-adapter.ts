import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment/moment';

@Injectable()
export class FormsDateAdapter {
  fromModel(value: string): NgbDateStruct | null {
    if (!value) return null;
    let parts = value.split('/');
    if (parts.length > 1) {
      return { year: +parts[2], month: +parts[0], day: +parts[1] };
    }
    parts = value.split('-');
    if (parts.length > 1) {
      return { year: +parts[0], month: +parts[1], day: +parts[2] };
    }
    return null;
  }

  toModel(date: NgbDateStruct): string | null {
    return date
      ? ('0' + date.month).slice(-2) +
          '/' +
          ('0' + date.day).slice(-2) +
          '/' +
          date.year
      : null;
  }
}
