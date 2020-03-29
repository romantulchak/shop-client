import { Order } from './order.model';

export class User{
    id: number;
    username: string;
    email: string;
    roles: string[];
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    postalCode: string;
    mobilePhone: string;
    custom: Order[];
}