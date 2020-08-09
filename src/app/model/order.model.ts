import {Product} from '../model/product.model';
import { Status } from './status.model';
import {User} from './user.model';
import { CustomCourier } from './customCourier.model';
import { CustomPostOffice } from './customPostOffice.model';
export class Order{
    id: number;
    items: any[];
    costumerName: string;
    email: string;
    costumerLastName: string;
    costumerAddress: string;
    customerMobilePhone: string;
    statuses: Status[];
    cancel?: boolean;
    totalPrice?: number;
    identificationNumber?: string;
    costumerCourier?: CustomCourier;
    customPostOffice?: CustomPostOffice;
    user?: User;
    customProducts?: any[];
}
