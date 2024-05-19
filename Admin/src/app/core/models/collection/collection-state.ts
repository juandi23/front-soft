import { Direction } from '../../types/table-types';

export interface CollectionState {
  orderBy?: string;
  direction?: Direction;
  q?: string | null;
  //
  page: number;
  limit: number;

  from: number;
  to: number;
  total: number;
}
