import { Pipe, PipeTransform } from '@angular/core';

import { CartProduct } from '@models/cart/cart-product.model';

@Pipe({ name: 'appFilter' })
export class FilterProductsPipe implements PipeTransform {
  /**
   * Pipe filters the list of rooms-chat based on the search text provided
   *
   * @param items list of rooms to search in
   * @param searchText search string
   * @returns list of rooms filtered by search text or []
   */
  transform(items: CartProduct[], searchText: string): CartProduct[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.product.title.toLocaleLowerCase().includes(searchText) || it.product.price.toString().includes(searchText);
    });
  }
}
