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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { first } from 'lodash';
import { readFile } from '@functions/files';

@Component({
  selector: 'app-gallery-input',
  templateUrl: './gallery-input.component.html',
  styleUrls: ['./gallery-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GalleryInputComponent,
      multi: true,
    },
  ],
})
export class GalleryInputComponent
  extends CommonComponent
  implements ControlValueAccessor
{

  @Input() media: Media | null;
  @Input() label = '';
  @ViewChild('gallery', { static: true }) gallery: TemplateRef<any>;

  default = [
    {
      src: 'https://via.placeholder.com/200?text=Unavailable',
      caption: 'https://via.placeholder.com/200?text=Unavailable',
      thumb: 'https://via.placeholder.com/200?text=Unavailable',
    },
  ];

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private lightbox: Lightbox,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private api: CommonApiService,
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
              this.toastr.error(err?.message || 'Ocurrió un error.'),
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

  openModal() {
    this.modalService.open(this.gallery, { size: 'lg', centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onSelect(media: Media) {
    this.media = media;
    this.closeModal();
    this.onChange(media);
  }
}
