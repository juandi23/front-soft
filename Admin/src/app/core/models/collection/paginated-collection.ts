import { Collection } from './collection';
import { CollectionMeta } from '@models/collection/collection-meta';

export interface PaginatedCollection<T> extends Collection<T> {
  meta: CollectionMeta;
}
