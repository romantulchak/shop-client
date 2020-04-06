import { Image } from './image.model';
import { Category } from './category.model';
import { Brand } from './brand.models';
import { Cpu } from './cpu.model';
import { Gpu } from './gpu.model';

export class Product{

    id: number;
    productName: string;
    productPrice: number;
    description: string;
    image: Image[]; 
    category: Category;
    showButton?: boolean;
    brand: Brand;
    amountInStock: number;
    cpu: Cpu;
    gpu: Gpu;

}