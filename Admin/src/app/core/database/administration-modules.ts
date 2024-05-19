import { MenuItem } from '@models/layout/menu.model';

export const dataModules: MenuItem[] = [
  {
    id: 3,
    label: 'HEADER.ACCOUNTS',
    icon: 'bx-user-circle',
    subItems: [
      {
        id: 17,
        label: 'Usuarios',
        icon: 'bx-collection',
        link: '/admin/users',
      }
      ,
      {
        id:18,
        label: 'Mayoristas',
        icon: 'bx-user-circle',
        link: '/admin/users/wholesale-form',
       },
    ],

  },
  {
    id: 6,
    label: 'Productos',
    icon: 'bx-package',
    link: '/admin/products',
  },
  {
    id: 7,
    label: 'Categorias',
    icon: 'bx-sitemap',
    link: '/admin/categories',
  },
  {
    id: 8,
    label: 'Etiquetas',
    icon: 'bx-tag',
    link: '/admin/tags',
  },

  {
    id: 14,
    label: 'Ventas',
    icon: 'bxl-shopify',
    subItems: [
      {
        id: 15,
        label: 'Estadísticas',
        icon: 'bx-collection',
        link: '/admin/sales/',
      },
      {
        id: 16,
        label: 'Ordenes',
        icon: 'bx-collection',
        link: '/admin/orders/',
      }
    ],
  },

  {
    id: 9,
    label: 'Estilos de la tienda',
    icon: 'bxs-color-fill',
    subItems: [
      {
        id: 10,
        label: 'Estilos',
        icon: 'bx-collection',
        link: '/admin/users/styles',
      },
    ],
  },
  {
    id: 11,
    label: 'Marketing',
    icon: 'bxs-megaphone',
    // link: '../marketing/custom-popup',
    subItems: [
      {
        id: 12,
        label: 'Popups personalizados',
        icon: 'bx-collection',
        link: '/admin/marketing/custom-popup',
      },
      {
        id: 13,
        label: 'Cupones',
        icon: 'bx-collection',
        link: '/admin/marketing/cupons',
      },
      {
        id:14,
        label: 'Banners',
        icon: 'bx-collection',
        link: '/admin/marketing/banners',

      }
    ],
  }

];
