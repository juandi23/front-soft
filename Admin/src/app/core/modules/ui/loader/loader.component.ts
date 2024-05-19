import { Component } from '@angular/core';
import { LoaderService } from '@services/layout/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  loading = true;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe(v => {
      setTimeout(() => {
        this.loading = v;
      }, 1500);
    });
  }
}
