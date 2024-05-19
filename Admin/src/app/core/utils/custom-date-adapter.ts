import * as moment from 'moment/moment';

import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateAdapter {
  fromModel(value: string): NgbDateStruct | null {
    if (!value) return null;
    const parts = value.split('-');
    return { year: +parts[0], month: +parts[1], day: +parts[2] };
  }

  toModel(date: NgbDateStruct): string | null {
    // from internal model -> your mode
    return date
      ? date.year +
          '-' +
          ('0' + date.month).slice(-2) +
          '-' +
          ('0' + date.day).slice(-2)
      : null;
  }

  ngbDateToMomentFormat(
    date: NgbDateStruct,
    format = 'YYYY-MM-DD',
    updateTimeZone = true
  ) {
    const offset = updateTimeZone ? new Date().getTimezoneOffset() : 0;
    return moment(this.toModel(date))
      .subtract(offset, 'minute')
      .utc()
      .format(format);
  }

  ngbTimeToMomentFormat(
    date: Date,
    format = 'HH:mm:ss',
    updateTimeZone = true
  ) {
    const offset = updateTimeZone ? new Date().getTimezoneOffset() : 0;
    return moment(date).subtract(offset, 'minute').format(format);
  }

  stringToFormat(
    str: any,
    meridian: string,
    format = 'HH:mm:ss',
    updateTimeZone = true
  ) {
    const parts = str.value.split(':');
    const offset = updateTimeZone ? new Date().getTimezoneOffset() : 0;
    const sumHours = meridian === 'AM' ? 0 : 12;
    return moment()
      .hour(parseInt(parts[0]))
      .minute(parseInt(parts[1]))
      .seconds(0)
      .add(sumHours, 'hour')
      .subtract(offset, 'minute')
      .format(format);
  }
}
