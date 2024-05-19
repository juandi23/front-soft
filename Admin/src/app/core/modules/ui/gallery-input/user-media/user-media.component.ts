import { first, get } from 'lodash';

import { ActivatedRoute } from '@angular/router';
import { CollectionBaseComponent } from '@components/abstract/collection-base.component';
import { CollectionService } from '@services/common/collection.service';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonVerbsApiService } from '@services/common/common-verbs-api.service';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { Media } from '@models/media/media.model';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { readFile } from '@functions/files';

@Component({
  selector: 'app-user-media',
  templateUrl: './user-media.component.html',
  providers: [
    CollectionService,
    { provide: 'API_SERVICE', useValue: 'media' },
    CommonApiService,
    CommonVerbsApiService,
  ],
})
export class UserMediaComponent extends CollectionBaseComponent<Media> {
  @Input() accept = 'image/jpeg,image/jpg,image/png,image/gif';
  @Output() emitter: EventEmitter<Media> = new EventEmitter();

  constructor(
    router: Router,
    location: Location,
    api: CommonApiService,
    service: CollectionService<Media>,
    private route: ActivatedRoute,
    private http: CommonVerbsApiService,
    private toastr: ToastrService
  ) {
    super(
      ``,
      api,
      service,
      8,
      'createdAt',
      [],
      [
        {
          key: 'companies',
          values: [route.snapshot.data.company.id],
        },
        {
          key: 'types',
          values: ['IMAGE'],
        },
      ],
      'DESC'
    );
  }

  onUpload(event: NgxDropzoneChangeEvent) {
    const file = event.addedFiles[0];
    if (file) {
      readFile(file).then(() => {
        const params = {
          file: file,
          source: 'UNKNOWN',
          bytesSize: file.size
        };
        const subscribe = this.api
          .form<Media[]>(`media/upload`, params)
          .subscribe({
            error: err =>
              this.toastr.error(err?.message || 'An Ocuurido un Error.'),
            next: response => this.emitter.emit(first(response)),
          });
        this.unsubscribe.push(subscribe);
      });
    }
  }

  getImageUrl(element: any): string {
    return get(element, 'children.0.url', get(element, 'url', null));
  }
}
