import { Component, OnInit } from '@angular/core';

import { EventService } from '../../../../../core/services/layout/event.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})
export class HorizontalComponent implements OnInit {
  topbar = 'light';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.subscribe('changeTopbar', topbar => {
      this.topbar = topbar;
      this.changeTopbar(this.topbar);
    });
    document.body.setAttribute('data-layout', 'horizontal');

    document.body.removeAttribute('data-sidebar');
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-keep-enlarged');
    document.body.removeAttribute('data-sidebar-small');

    this.changeTopbar(this.topbar);
  }

  changeTopbar(topbar: string) {
    switch (topbar) {
      case 'light':
        // document.body.setAttribute('data-topbar', 'light');
        break;
      case 'dark':
        document.body.setAttribute('data-topbar', 'dark');
        break;
      case 'colored':
        document.body.setAttribute('data-topbar', 'colored');
        break;
      default:
        document.body.setAttribute('data-topbar', 'dark');
        break;
    }
  }
}
