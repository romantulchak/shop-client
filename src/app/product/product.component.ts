import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { ProductsComponent } from '../products/products.component';
import { BasketService } from '../service/basket.service';
import { ProductDTO } from '../model/productDTO.model';
import { SubcategoryService } from '../service/subcategory.service';
import { Subcategory } from '../model/subcategory.model';
import { Options } from 'ng5-slider';
interface SliderDetails {
  value: number;
  highValue: number;
  floor: number;
  ceil: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public totalPages: Array<any>;
  public page:number = 0;

  public subcategories: Subcategory[];
  public products: Product[];
  public productDTO: ProductDTO;
  public categoryName:string;
  public minValue: number;
  public maxValue: number;

  slider: SliderDetails;


  @ViewChild(ProductsComponent) private child:ProductsComponent;
  constructor(private activeRoute: ActivatedRoute, private subcategoryService: SubcategoryService, private productService: ProductService, private basketService: BasketService) {
    this.activeRoute.params.subscribe(
      res=>{
        this.categoryName = res.categoryName;
        this.findByCategory(res.categoryName);
        this.getSubcategoriesForCategory();
      }
    );
  }

  ngOnInit(): void {
  }
  private findByCategory(categoryName:string){

    this.totalPages = [];
    this.slider = {
      value: null,
      ceil: null,
      floor: null,
      highValue: null
    }
    this.productService.filterByCategory(categoryName, this.page).subscribe(
      res=>{
        if(res != null){
          this.productDTO =res;
          console.log(this.productDTO);

          this.totalPages = new Array(res.totalPages);
          setTimeout(() => {
            this.child.checkInBasket(res.productDTOS);
          }, 200);
          this.getMaxPrice();
        }
      },
      error=>{
        console.log(error);
      }

    );
  }
  public setPage(page: number, event){
    event.preventDefault();
    this.page = page;
    this.findByCategory(this.categoryName);
  }

  private getSubcategoriesForCategory(){
    this.subcategoryService.getSubactegoriesByCategoryName(this.categoryName).subscribe(
      res=>{
        if(res != null){
          this.subcategories = res;
        }
      }
    );
  }
  private getMaxPrice(){
    this.productService.getMaxPrice(this.categoryName).subscribe(
      res=>{
        if(res != null){

          this.slider = {
            value: 0,
            ceil: res,
            floor: 0,
            highValue: res
          };
          this.maxValue = res;
        }
      }
    );
  }
  public sliderOptions(): Options{
    return {
      floor: this.slider.floor,
      ceil: this.slider.ceil,
      step: 1,
    }
  }
}
