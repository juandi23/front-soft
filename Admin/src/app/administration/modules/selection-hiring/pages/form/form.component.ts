import { Component, Inject, OnInit } from "@angular/core";

import { CommonApiService } from "@services/common/common-api.service";
import { CommonPageComponent } from "@components/abstract/common-page.component";
import { ModelService } from "@services/common/model.service";
import { map } from 'rxjs/operators';
import { ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs';
import { validate as uuidValidate } from 'uuid';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    { provide: 'API_SERVICE', useValue: 'employees' },
    CommonApiService,
  ],
})
export class FormComponent extends CommonPageComponent implements OnInit {
  constructor(
    private api: CommonApiService,
  
    private route: ActivatedRoute
  ) {
    super('Selecion y Contratacion', [
      { label: 'Selecion y Contratacion', route: '../' },
    ]);
  }

  ngOnInit(): void {
    const subscribe = this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          if (params.get('id') && uuidValidate(params.get('id') || '') && this.route.snapshot.data.modelBot?.id !==  params.get('id')) {
            return params.get('id');
          }
          return null;
        }),
        tap(id => {
            this.breadCrumbs.push({ label: 'Create', active: true });
     
        }),
        switchMap(id => {
          return id
            ? this.api.get<any>(`/${id}`, { limit: 50, page: 1 },)
            : of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(model => {
      });
    this.unsubscribe.push(subscribe);
  }
}
