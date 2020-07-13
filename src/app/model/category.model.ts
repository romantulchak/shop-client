import { Product } from './product.model';
import { Subcategory } from './subcategory.model';

export class Category{
    id: number;
    categoryName: string;
    imagePath?: string;
    product: Product[];
    categoryIcon?: string;
    subcategories?:Subcategory[];
    section?: any[];
    constructor(id:number, categoryName?: string, product?:Product[], imagePath?: string){
        this.id = id;
        this.categoryName = categoryName;
        this.product = product;
        this.imagePath = imagePath;
    }
}
