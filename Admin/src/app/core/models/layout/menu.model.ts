export interface MenuItem {
  id: number;
  label: string;
  icon?: string;
  link?: string;
  subItems?: any;
  parentId?: number;
  isUiElement?: boolean;
  isTitle?: boolean;
  externalUrl?: string;
  badge?: any;
  isLayout?: boolean;
}
