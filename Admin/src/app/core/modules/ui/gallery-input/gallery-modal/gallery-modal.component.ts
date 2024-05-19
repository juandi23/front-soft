import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Media } from '@models/media/media.model';
import { Output } from '@angular/core';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styles: [],
})
export class GalleryModalComponent {
  active = 1;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() emitter: EventEmitter<Media> = new EventEmitter();
}
