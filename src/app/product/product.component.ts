import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { ProductsComponent } from '../products/products.component';
import { BasketService } from '../service/basket.service';
import { ProductDTO } from '../model/productDTO.model';
import { NgIf } from '@angular/common';
import { SubcategoryService } from '../service/subcategory.service';
import { Subcategory } from '../model/subcategory.model';

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
  @ViewChild(ProductsComponent) private child:ProductsComponent;
  constructor(private activeRoute: ActivatedRoute, private subcategoryService: SubcategoryService, private productService: ProductService, private basketService: BasketService) {
    this.activeRoute.params.subscribe(
      res=>{
        this.categoryName = res.categoryName;
        this.findByCategory(res.categoryName);
      }
    );
  }

  ngOnInit(): void {
    this.getSubcategoriesForCategory();
  }
  findByCategory(categoryName:string){
    this.totalPages = [];
    this.productService.filterByCategory(categoryName, this.page).subscribe(
      res=>{
        if(res != null){
          this.productDTO =res;
          console.log(this.productDTO);

          this.totalPages = new Array(res.totalPages);
          setTimeout(() => {
            this.child.checkInBasket(res.productDTOS);
          }, 200);
        }
      },
      error=>{
        console.log(error);
      }

    );
  }
  setPage(page: number, event){
    event.preventDefault();
    this.page = page;
    this.findByCategory(this.categoryName);
  }

  getSubcategoriesForCategory(){
    this.subcategoryService.getSubactegoriesByCategoryName(this.categoryName).subscribe(
      res=>{
        if(res != null){
          console.log(res);

          this.subcategories = res;
        }
      }
    );
  }
}
