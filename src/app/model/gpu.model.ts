import { Product } from './product.model';

export class Gpu{
    id: number;
    name: string;
    memoryFrequency: number;
    memorySize: string;
    memoryBusWidth: number;
    memoryType:string;
    products:Product[];
}