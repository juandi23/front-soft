import { Breadcrumb } from '../../../models/layout/breadcrumb.model';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss'],
})
export class PagetitleComponent {
  @Input() breadcrumbItems: Breadcrumb[] = [];
  @Input() title = '';
}
