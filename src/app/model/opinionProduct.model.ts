import { Product } from './product.model';
import { User } from './user.model';

export class OpinionProduct{
    id: number;
    commentToProduct: Product;
    user: User;
    text: string;
    rating:number;
}