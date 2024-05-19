import { Component, OnInit } from '@angular/core';
import { BaseSidebarComponent } from '@components/abstract/base-sidebar.component';
import { EventService } from '@services/layout/event.service';
import { dataModules } from '@database/administration-modules';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [EventService],
})
export class SidebarComponent extends BaseSidebarComponent implements OnInit {
  override ngOnInit(): void {
    this.menuItems = dataModules;

    const readUserRole = this.authenticationService.authService.model.roles.find(e => e.name === 'MARKETER_USER');
    if(readUserRole && this.authenticationService.authService.model.roles.length === 1){
      this.menuItems = this.menuItems.filter(item => {
        if (item.label === 'Marketing') {
          return true;
        } else if (item.subItems) {
          item.subItems = item.subItems.filter(subItem => subItem.label === 'Company Modules');
          return item.subItems.length > 0;
        }
        return false;
      });
    }

  }
}
