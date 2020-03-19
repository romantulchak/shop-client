import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.model';
import { error } from 'protractor';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  private id: number;
  public product:Product;
  constructor(private route: ActivatedRoute, private productService: ProductService) {

      this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));

   }

  ngOnInit(): void {
    this.details();
  }

  details(){
    this.productService.detailsProduct(this.id).subscribe(

      res=>{this.product = res;},
      error=>{console.log(error);}

    );
  }

}
