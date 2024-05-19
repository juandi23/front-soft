import { UserTag } from '@models/media/user-tag.model';
export type MediaType =
  | 'IMAGE'
  | 'DOCUMENT'
  | 'AUDIO'
  | 'SPREADSHEET'
  | 'UNKNOWN';

export interface Media {
  id?: string;
  name?: string;
  description?: string;
  url: string | null;
  dueAt?: string;
  createdAt?: string;
  size?: string;
  width?: number;
  height?: number;
  children?: Media[];
  file: File | null;
  reference: string | null;
  userTags?: UserTag[];
  type?: MediaType;
  extension?: string;
  parentEntity?: any;
  parentEntityType?: string;
  documentId?: string;
}
