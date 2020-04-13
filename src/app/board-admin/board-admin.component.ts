import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { NotificationService } from '../service/notification.service';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  public product: Product[];
  public currnetProduct: Product;
  constructor(private productService: ProductService, private notificiationService: NotificationService) { }
  
  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe(

      res=>{
        console.log(res);
        if(res != null)
          this.product = res;
          console.log(res);
      },
      error=>{
        console.log(error);
      }

    );
  }
  addPromo(product: Product,percent: string,numberOfDays: any, numberOfUses: string){
    this.productService.addPromo(product,  Number.parseInt(percent),Number.parseInt(numberOfDays),  Number.parseInt(numberOfUses)).subscribe(

      res=>{
        this.notificiationService.openSnackBar(res);
        this.getProducts();
      }

    );
  }

  setGlobalDiscount(product: Product, percent: number){
    this.productService.setGlobalDiscount(product, percent).subscribe(

      res=>{
        this.notificiationService.openSnackBar(res);
      }
    );
  }
  
}
