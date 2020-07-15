import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { ProductsComponent } from '../products/products.component';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products: Product[];
  @ViewChild(ProductsComponent) private child:ProductsComponent;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private basketService: BasketService) {
    activeRoute.params.subscribe(
      res=>{
        this.findByCategory(res.categoryName);

      }
    )

   }

  ngOnInit(): void {
  }
  findByCategory(categoryName:string){
    this.productService.filterByCategory(categoryName).subscribe(
      res=>{
        if(res != null){
          this.products = res;
          this.child.checkInBasket(res);
          setTimeout(() => {
          }, 500);
        }
      },
      error=>{
        console.log(error);
      }

    );
  }




}
