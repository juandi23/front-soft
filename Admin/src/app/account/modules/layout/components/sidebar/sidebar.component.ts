import { Component, OnInit } from '@angular/core';
import { BaseSidebarComponent } from '@components/abstract/base-sidebar.component';
import { EventService } from '@services/layout/event.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [EventService],
})
export class SidebarComponent extends BaseSidebarComponent implements OnInit {
  override ngOnInit(): void {
    this.menuItems = [];
  }
}
