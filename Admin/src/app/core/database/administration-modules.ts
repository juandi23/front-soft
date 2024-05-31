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


];
