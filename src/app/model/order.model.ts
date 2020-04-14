import {Product} from '../model/product.model';
import { Status } from './status.model';
import {User} from './user.model';
export class Order{
    id: number;
    items: any[];
    costumerName: string;
    email: string;
    costumerLastName: string;
    costumerAddress: string;
    costumerCity: string;
    customerMobilePhone: string;
    customerPostalCode: string;
    statuses: Status[];
    cancel?: boolean;
    totalPrice?: number;
    identificationNumber?: string;
    user?: User;
    customProducts?: any[];
}