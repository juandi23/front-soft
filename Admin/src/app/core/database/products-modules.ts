import { MenuItem } from '@models/layout/menu.model';

export const dataModules: MenuItem[] = [
  {
    id: 3,
    label: 'Productos',
    icon: 'bx-user-circle',
    link: '/products/portal',
  },
  {
    id: 3,
    label: 'Ordenes',
    icon: 'bx-receipt',
    link: '/products/orders',
  },
  {
    id: 4,
    label: 'Carrito',
    icon: 'bx-cart',
    link: '/products/cart',
  },
  {
    id: 5,
    label: 'Favoritos',
    icon: 'bx-heart',
    link: '/products/favorites',
  },
];
