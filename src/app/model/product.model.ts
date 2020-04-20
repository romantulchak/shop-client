import { Image } from './image.model';
import { Category } from './category.model';
import { Brand } from './brand.model';
import { Cpu } from './cpu.model';
import { Gpu } from './gpu.model';
import { PromotionalCode } from './promotionalCode.model';
import { OpinionProduct } from './opinionProduct.model';

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
    promotionalCodes?: PromotionalCode[];
    discountPrice: number;
    isGlobalDiscount: boolean;
    opinionProducts?:OpinionProduct[];
    properties?: Map<string, string>;
}