import { Image } from './image.model';
import { Category } from './category.model';

export class Product{

    id: number;
    productName: string;
    productPrice: number;
    description: string;
    image: Image[]; 
    category: Category;

}