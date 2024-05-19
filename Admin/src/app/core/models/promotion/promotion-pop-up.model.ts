import { Media } from "@models/media/media.model";

export interface ProductPromotion {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    link: string;
    discountPercentage: number;
    media?: string;
}
