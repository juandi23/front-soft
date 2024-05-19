import { UserWhosale } from "./account/whosale.model";

export class User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email: string;
    whosaleUsers?: UserWhosale;
}
