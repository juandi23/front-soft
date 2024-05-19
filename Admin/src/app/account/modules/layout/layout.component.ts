import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { EventService } from '@services/layout/event.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThemeService } from '@services/layout/theme-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [],
})
export class LayoutComponent implements OnInit, OnDestroy {
  residentMenu = this.route.snapshot.data.residentMenu ?? false;

  layoutType: string;
  layoutwidth = 'fluid';
  topbar = 'dark';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private themeService: ThemeService
    ) {
    const attributeAux = this.themeService.getLayout();;
    this.layoutType = attributeAux !== '' ? attributeAux : 'horizontal';
  }

  ngOnInit(): void {
    this.eventService.subscribe('changeLayout', layout => {
      this.layoutType = layout;
      document.body.setAttribute('data-layout', layout);
      if(layout === 'horizontal'){
        document.body.classList.remove('vertical-collpsed');
        document.body.classList.remove('sidebar-enable');
      }
    });

    this.layoutWidth(this.layoutwidth);

    this.eventService.subscribe('changeWidth', width => {
      this.layoutwidth = width;
      this.layoutWidth(this.layoutwidth);
    });
  }

  layoutWidth(width: string) {
    switch (width) {
      case 'fluid':
        document.body.setAttribute('data-layout-size', 'fluid');
        document.body.classList.remove('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case 'boxed':
        document.body.setAttribute('data-layout-size', 'boxed');
        document.body.classList.add('vertical-collpsed');
        document.body.removeAttribute('data-layout-scrollable');
        break;
      case 'scrollable':
        document.body.removeAttribute('data-layout-size');
        document.body.setAttribute('data-layout-scrollable', 'true');
        document.body.setAttribute('data-layout-size', 'fluid');
        document.body.classList.remove(
          'right-bar-enabled',
          'vertical-collpsed'
        );
        break;
      default:
        document.body.setAttribute('data-layout-size', 'fluid');
        break;
    }
  }

  isVerticalLayoutRequested() {
    return this.layoutType === 'vertical';
  }

  isHorizontalLayoutRequested() {
    return this.layoutType === 'horizontal';
  }

  ngOnDestroy(): void {
    document.body.removeAttribute('data-application');
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-application');
    document.body.removeAttribute('data-disposition');
  }
}
