import { User } from "@models/auth.models";
export interface UserWhosale {
    id: string;
    isApproved: number;
    companyName: string;
    companySize: string;
    phone: string;
    address: string;
    RUT: string;
    active: number;
    createdAt: string;
    user: User;
}