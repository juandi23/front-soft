import { AfterViewInit } from '@angular/core';
import { BaseTopBarComponent } from './base-top-bar.component';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { LinkRef } from '@models/layout/link-ref.model';
import { MenuItem } from '@models/layout/menu.model';
import MetisMenu from 'metismenujs';
import { NavigationEnd } from '@angular/router';
import { OnChanges } from '@angular/core';
import { OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import { head } from 'lodash';
import { isArray } from 'lodash';

@Component({ template: '' })
export abstract class BaseSidebarComponent
  extends BaseTopBarComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChild('componentRef') scrollRef!: any;
  @ViewChild('sideMenu') sideMenu!: ElementRef;

  @Input() isCondensed = false;

  menuItems: MenuItem[] = [];
  menu!: MetisMenu;

  override ngOnInit(): void {
    super.ngOnInit();
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.activateMenuDropdown();
        this.scrollElement();
      }
    });
    this.scrollElement();
  }

  ngAfterViewInit(): void {
    if (this.sideMenu) {
      this.menu = new MetisMenu(this.sideMenu.nativeElement);
      this.activateMenuDropdown();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((!this.isCondensed && this.sideMenu) || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName('mm-active').length > 0) {
        const active = document.getElementsByClassName('mm-active');
        if (active && isArray(active)) {
          const el = head(active);
          const currentPosition = el['offsetTop'];
          if (currentPosition > 500) {
            if (this.scrollRef.SimpleBar !== null) {
              this.scrollRef.SimpleBar.getScrollElement().scrollTop =
                currentPosition + 300;
            }
          }
        }
      }
    }, 300);
  }

  activateMenuDropdown() {
    this.removeAllClass('mm-active');
    this.removeAllClass('mm-show');
    const links: HTMLCollectionOf<LinkRef> =
      document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      paths.push(link.pathname);
    }
    const itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.slice(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }

    if (menuItemEl) {
      menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement?.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) {
              childAnchor.classList.add('mm-active');
            }
            if (childDropdown) {
              childDropdown.classList.add('mm-active');
            }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') {
                  childanchor.classList.add('mm-active');
                }
              }
            }
          }
        }
      }
    }
  }

  removeAllClass(className: string) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  override hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
}
