import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';
import { BoardAdminComponent } from '../../templates/admin-component/board-admin.component';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {



  public currnetProduct: Product;
  public isDiscount: boolean = false;
  public isPromo: boolean = false;

  public notifyDiscount: boolean = false;

  public percent:number;
  public product: Product;




  constructor(@Inject(MAT_DIALOG_DATA) public productId: number, private productService: ProductService, private notificationService: NotificationService) { }

  ngOnInit(): void {

      this.getProduct();

    
  }


  getProduct(){
    this.productService.findById(this.productId).subscribe(

      res=>{
        if(res != null){
          this.product = res;
        }
      }

    );
  }

  isGlobalDiscount(product: Product){
    this.currnetProduct = product;
    product.isGlobalDiscount = !product.isGlobalDiscount;
  }

  setGlobalDiscount(product: Product){

    if(this.percent === undefined){
      this.percent = 0;
    }
    this.productService.setGlobalDiscount(product, this.percent, this.notifyDiscount).subscribe(
      res=>{

        this.getProduct();
        this.notificationService.openSnackBar(res + ' data will save after dialog close');
      }
    );
  }
  addPromo(product: Product,percent: string,numberOfDays: any, numberOfUses: string){
    this.productService.addPromo(product,  Number.parseInt(percent),Number.parseInt(numberOfDays),  Number.parseInt(numberOfUses)).subscribe(

      res=>{
        this.getProduct();
        this.notificationService.openSnackBar(res);
      }

    );
  }

  updateProduct(){
    console.log(this.product);
    this.productService.updateProduct(this.product).subscribe(

      res=>{
        this.notificationService.openSnackBar(res);
      }

    );

  }


}
