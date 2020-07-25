import { Product } from './product.model';

export class ProductDTO{
  currentPage:number;
  productDTOS: Product[];
  productsCounter: number;
  totalPages: number;
  totalItems: number;
}
