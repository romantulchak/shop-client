import { Category } from './category.model';

export class Subcategory{
  id:number;
  subcategoryName:string;
  category:Category;
  sections?: any;
  sectionsInDb?: any[];
}
