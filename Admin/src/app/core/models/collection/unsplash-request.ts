import { CollectionFilter } from '@models/collection/collection-filter';
import { Direction } from '../../types/table-types';

export interface UnsplashRequest {
  client_id: string;
  page: number;
  query: string;
  per_page: number;
  w: number;
}
