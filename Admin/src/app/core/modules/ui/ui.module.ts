import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { GalleryInputComponent } from './gallery-input/gallery-input.component';
import { GalleryModalComponent } from './gallery-input/gallery-modal/gallery-modal.component';
import { ImagesComponent } from './images/images.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from '@services/layout/loader.service';
import { MediaInputComponent } from './media-input/media-input.component';
import { NgModule } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NoDataComponent } from './no-data/no-data.component';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SortableDirective } from '../../directives/tables/sortable.directive';
import {TranslateButtonComponent} from './translate-button/translate-buttton.component';
import { UserMediaComponent } from './gallery-input/user-media/user-media.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';

@NgModule({
  declarations: [
    SortableDirective,
    LoaderComponent,
    PagetitleComponent,
    ImagesComponent,
    FileUploadComponent,
    NoDataComponent,
    TranslateButtonComponent,
    GalleryInputComponent,
    GalleryModalComponent,
    UserMediaComponent,
    MediaInputComponent,
    YoutubeIframeComponent
  ],
  exports: [
    SortableDirective,
    LoaderComponent,
    PagetitleComponent,
    ImagesComponent,
    FileUploadComponent,
    NoDataComponent,
    GalleryInputComponent,
    GalleryModalComponent,
    MediaInputComponent,
    TranslateButtonComponent,
    YoutubeIframeComponent
  ],
  imports: [
   NgbModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgxDropzoneModule,
    NgbNavModule,
    NgbModalModule

  ],
  providers: [LoaderService],
})
export class UiModule {}
