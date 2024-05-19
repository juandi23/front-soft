import { CollectionMemoryComponent } from '@components/abstract/collection-memory.component';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UntypedFormBuilder } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';

@Component({ template: `` })
export abstract class CollectionMemoryAndFormComponent<
  T,
  R
> extends CollectionMemoryComponent<T> {
  group!: UntypedFormGroup;
  submit = false;

  protected constructor(
    @Inject('SearchTerm') searchTerm: string,
    spinner: NgxSpinnerService,

    protected builder: UntypedFormBuilder
  ) {
    super(searchTerm, spinner);
  }
}
