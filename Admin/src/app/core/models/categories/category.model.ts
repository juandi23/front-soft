import { Media } from "@models/media/media.model";

export interface Category {
  id: string;
  title: string;
  description?: string;
  logoMedia?: Media;
  createdAt: string;
  deletedAt?: string;
}

