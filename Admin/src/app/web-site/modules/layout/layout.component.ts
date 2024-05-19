import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [],
})
export class LayoutComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.setAttribute('data-layout', 'horizontal');
    document.body.setAttribute('data-layout-size', 'boxed');
    document.body.setAttribute('data-application', 'web-site');
    document.body.removeAttribute('data-sidebar');
    document.body.removeAttribute('data-topbar');
  }

  ngOnDestroy(): void {
    document.body.removeAttribute('data-application');
  }
}
