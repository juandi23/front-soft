import { Directive } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { SortEvent } from '../../models/collection/sort-event';

const rotate: { [key: string]: 'ASC' | 'DESC' | '' } = {
  ASC: 'DESC',
  DESC: '',
  '': 'ASC',
};

@Directive({
  selector: 'th[sortable]',
})
export class SortableDirective {
  @Input() sortable!: string;
  @Input() direction: 'ASC' | 'DESC' | '' = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc') get asc() {
    return this.direction === 'ASC';
  }
  @HostBinding('class.desc') get desc() {
    return this.direction === 'DESC';
  }

  @HostListener('click') onClick() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
