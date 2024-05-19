import { Breadcrumb } from '@models/layout/breadcrumb.model';
import { CommonComponent } from './common-component.component';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';

@Component({ template: '' })
export abstract class CommonPageComponent extends CommonComponent {
  protected constructor(
    @Inject(String) public title: string,
    @Inject(Array) public breadCrumbs: Breadcrumb[]
  ) {
    super();
  }
}
