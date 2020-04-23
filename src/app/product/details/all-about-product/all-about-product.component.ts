import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-all-about-product',
  templateUrl: './all-about-product.component.html',
  styleUrls: ['./all-about-product.component.css']
})
export class AllAboutProductComponent implements OnInit {


  public product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.product.subscribe(
      product=>{
        this.product = product;
      }
    );
  }

}
