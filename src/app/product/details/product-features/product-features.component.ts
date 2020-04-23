import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-features',
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.css']
})
export class ProductFeaturesComponent implements OnInit {


  public product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.updateProductAfterReload.subscribe(
      res=>{
        if(res===true){
          this.productService.product.subscribe(
            product=>{
              console.log('ERRRRRRRRRORRRRRRRRRRRRrrr');
              this.product = product;
            }
          );
        }
      }
    )
   
  }

}
