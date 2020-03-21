import {Product} from '../model/product.model';

export class Order{
    id: number;
    items: any[];
   // productsId: number[];
   // amounts: number[];
    costumerName: string;
    email: string;
    costumerLastName: string;
    costumerAddress: string;
    costumerCity: string;
    customerMobilePhone: string;
    customerPostalCode: string;
    totalPrice?: number;
    
}