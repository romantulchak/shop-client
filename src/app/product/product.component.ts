import { Component, OnInit, Input } from '@angular/core';
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
  public products: Product[];

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
    activeRoute.params.subscribe(
      res=>{
        this.categoryName = res.categoryName;

      }
    )

   }

  ngOnInit(): void {

  }





}
