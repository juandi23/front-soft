import { AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnDestroy } from '@angular/core';
import SimpleBar from 'simplebar-core';
import { SimpleBarOptions } from 'simplebar-core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ngx-simplebar',
  // host: { 'data-simplebar': 'init' },
  templateUrl: './simplebar-angular.component.html',
  styleUrls: ['./simplebar-angular.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SimplebarAngularComponent implements AfterViewInit, OnDestroy {
  @Input() options: Partial<SimpleBarOptions> = {};

  @HostBinding('data-simplebar') init = false;

  elRef: ElementRef;
  SimpleBar: any;
  ariaLabel: string;

  constructor(elRef: ElementRef, private zone: NgZone) {
    this.elRef = elRef;
    this.ariaLabel =
      this.options.ariaLabel || SimpleBar.defaultOptions.ariaLabel;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.SimpleBar = new SimpleBar(
        this.elRef.nativeElement,
        this.options || {}
      );
    });
  }

  ngOnDestroy() {
    this.SimpleBar.unMount();
    this.SimpleBar = null;
  }
}
