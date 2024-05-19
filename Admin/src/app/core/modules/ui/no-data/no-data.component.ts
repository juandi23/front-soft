import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data',
  template: `
    <div class="row justify-content-center py-2">
      <div class="col-12">
        <div class="border border-1">
          <p class="text-center my-3">No Data</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NoDataComponent {}
