import { Image } from './image.model';
import { Category } from './category.model';
import { Brand } from './brand.models';

export class Product{

    id: number;
    productName: string;
    productPrice: number;
    description: string;
    image: Image[]; 
    category: Category;
    showButton?: boolean;
    brand: Brand;
}