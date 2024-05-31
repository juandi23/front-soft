import { Component, OnInit } from '@angular/core';
import { AdminStyleService } from '../core/services/admin-style.service';
import { CommonApiService } from '@services/common/common-api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  providers: [
    { provide: 'API_SERVICE', useValue: '' },
    CommonApiService,
  ],
})
export class AppComponent implements OnInit  {
  constructor(
   public styles: AdminStyleService,
   private api :CommonApiService
  ) {}
  variables : any;
  ngOnInit() {

  

  }
}
