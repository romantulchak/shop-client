import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent implements OnInit {



  public currnetProduct: Product;

  constructor(@Inject(MAT_DIALOG_DATA) public product: Product, private productService: ProductService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  isGlobalDiscount(product: Product){
    this.currnetProduct = product;
    product.isGlobalDiscount = !product.isGlobalDiscount;
  }

  setGlobalDiscount(product: Product, percent: number){
    this.productService.setGlobalDiscount(product, percent).subscribe(

      res=>{
        this.notificationService.openSnackBar(res);
      }
    );
  }
}
