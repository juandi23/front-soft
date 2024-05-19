import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  @Input() src: string | null = null;
  @Input() alt = 'Lazo';
  @Input() class = 'w-100';
  private default = 'https://via.placeholder.com/200?text=Unavailable';

  error(): void {
    this.src = this.default;
  }
}
