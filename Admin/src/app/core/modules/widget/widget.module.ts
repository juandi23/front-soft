import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StatComponent } from './stat/stat.component';

@NgModule({
  declarations: [StatComponent],
  exports: [StatComponent],
  imports: [CommonModule],
})
export class WidgetModule {}
