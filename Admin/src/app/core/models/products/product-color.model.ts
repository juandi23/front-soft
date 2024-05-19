import { Media } from "@models/media/media.model";

export interface Color {
  id?: string;
  value: string;
  color: string;
  media: Media[];
  createdAt?: string;
  deletedAt?: string;
}
