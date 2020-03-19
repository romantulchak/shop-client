import { Product } from './product.model';

export class Category{
    id: number;
    categoryName: string;
    product: Product[];
    constructor(id:number, categoryName: string, product:Product[]){
        this.id = id;
        this.categoryName = categoryName;
        this.product = product;
    }
}