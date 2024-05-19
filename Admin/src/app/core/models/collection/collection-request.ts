import { CollectionFilter } from '@models/collection/collection-filter';

export interface CollectionRequest {
  orderBy?: string | null;
  direction?: 'ASC' | 'DESC' | '';
  q?: string;
  //
  page: number;
  limit: number;
  includes?: string[];
  filters?: CollectionFilter[];
  filter?: Map<string, string>;
}
