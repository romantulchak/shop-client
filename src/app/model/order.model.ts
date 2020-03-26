import {Product} from '../model/product.model';
import { Status } from './status.model';

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
    totalPrice?: number;
    //isBeingProcessed?: boolean;
    //isCompleted?: boolean;
    //inTransit?: boolean;
    //atTheDestination?: boolean;
    //received?: boolean;
    identificationNumber?: string;
    
}