import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public categoryName: string;
  private subscription: Subscription;
  public products: Product[];


  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {

    this.categoryName = activeRoute.snapshot.params['categoryName'];
    console.log(this.categoryName);
    this.subscription = activeRoute.params.subscribe(params => this.categoryName = params['categoryName']);

   }

  ngOnInit(): void {
  
  }

  

  

}
