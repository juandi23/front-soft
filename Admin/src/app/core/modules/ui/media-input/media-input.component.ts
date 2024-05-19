import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from '@services/common/common-api.service';
import { CommonComponent } from '@components/abstract/common-component.component';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { Media } from '@models/media/media.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';
import { first } from 'lodash';
import { readFile } from '@functions/files';

@Component({
  selector: 'app-media-input',
  templateUrl: './media-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MediaInputComponent,
      multi: true,
    },
  ],
})
export class MediaInputComponent
  extends CommonComponent
  implements ControlValueAccessor
{
  @Input() media: Media | null;
  @Input() label = '';
  default = [
    {
      src: 'https://via.placeholder.com/200?text=Unavailable',
      caption: 'https://via.placeholder.com/200?text=Unavailable',
      thumb: 'https://via.placeholder.com/200?text=Unavailable',
    },
  ];
  constructor(
    private host: ElementRef<HTMLInputElement>,
    private route: ActivatedRoute,
    private api: CommonApiService,
    private lightbox: Lightbox,

    private toastr: ToastrService
  ) {
    super();
  }

  onChange = (media: Media | null): void => {
    // do nothing.
  };
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    // do nothing.
  }
  writeValue(media: Media | null): void {
    if (media) {
      this.media = media;
    }
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
              this.toastr.error(err?.message || 'An ocurrido un Error.'),
            next: response => {
              if (response) {
                const media = first(response);
                if (media) {
                  this.onSelect(media);
                }
              }
            },
          });
        this.unsubscribe.push(subscribe);
      });
    }
  }

  preview() {
    this.lightbox.open(this.default, 0, {
      showZoom: true,
      wrapAround: true,
      showImageNumberLabel: true,
    });
  }
  onSelect(media: Media) {
    this.media = media;
    this.onChange(media);
  }
}
