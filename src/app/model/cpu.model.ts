import { Product } from './product.model';

export class Cpu{
    id:number;
    name: string;
    minFrequency: string;
    maxFrequency: string;
    numberOfCores: number;
    generation: string;
    cacheL3: number;
    integratedGraphics: boolean;
    products: Product[];
}