import * as moment from 'moment/moment';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class UsaDateParserFormatter {
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
    if (date) {
      const format = `${('0' + date.month).slice(-2)}-${('0' + date.day).slice(
        -2
      )}-${date.year}`;
      return moment.default(format, 'MM-DD-YYYY').format('MMM DD, YYYY');
    }
    return null;
  }
}
