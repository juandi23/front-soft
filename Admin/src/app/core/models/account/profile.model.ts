import { Media } from '@models/media/media.model';

export interface Profile {
  id: string;
  code: string;
  nickname: string;
  emailStatus: string;
  gender: string;
  about: string;
  phoneNumber: string;
  photoReleaseType: string;
  media: Media;

  birthdate: Date;

  //Wrong API Model
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  preferredName: string | null;
  archivedAt: Date | null;
}
