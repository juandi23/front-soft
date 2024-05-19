import { Media } from "@models/media/media.model";

export interface Banner {
    id: string;
    title?: string;
    startDate: string;
    endDate: string;
    link: string;
    media: Media;
}
