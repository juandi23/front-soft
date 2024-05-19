import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormsDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (!value) return null;
    const parts = value.split('-');
    return {
      year: +parts[0],
      month: +parts[1],
      day: +parts[2],
    } as NgbDateStruct;
  }
  format(date: NgbDateStruct): string | null {
    return date
      ? ('0' + date.month).slice(-2) +
          '/' +
          ('0' + date.day).slice(-2) +
          '/' +
          date.year
      : null;
  }
}
