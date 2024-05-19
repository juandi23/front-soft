import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styles: [],
})
export class StatComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() icon!: string;
}
