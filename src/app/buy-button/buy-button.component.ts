import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Product } from '../model/product.model';
import { BasketService } from '../service/basket.service';
import { NotificationService } from '../service/notification.service';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-buy-button',
  templateUrl: './buy-button.component.html',
  styleUrls: ['./buy-button.component.css']
})
export class BuyButtonComponent implements OnInit, AfterContentInit {

  @Input() currentProduct:Product;
  constructor(private basketService: BasketService, private dialogService: DialogService, private notificationService: NotificationService) {
   }
  private productToCheck = [];
  ngOnInit(): void {
    this.chechAfterRemove();
    setTimeout(() => {
      this.productToCheck =  this.basketService.sa;
    }, 200);
  }
  ngAfterContentInit(){

    this.checkInBasket();
  }
  private checkInBasket(isDetails?:boolean){
    setTimeout(() => {

      this.productToCheck.forEach(x=>{
        if(this.currentProduct?.id === x.id){
          this.currentProduct.showButton = x.showButton;
        }else if(isDetails){
            this.currentProduct.showButton = false;
        }
      });
     }, 500);
  }
  addToCart(product: Product){
    this.currentProduct = product;
    product.showButton = true;
    this.basketService.addToBasket(product);
    this.basketService.updateOrder.next(true);
    this.notificationService.success("Added to your card " + product.productName);
  }
  remindMeDiaglog(product: Product){
    this.dialogService.remindMeDiaglog(product);
  }
  chechAfterRemove(){
   this.basketService.updateProducts.subscribe(
     res=>{
      if(res === true){
        this.basketService.productsAfterRemove.subscribe(
          products=>{
            if(products != null)
            {
                this.productToCheck = products;
                if(products.length === 0){
                  this.currentProduct.showButton = false;
                }else{
                  this.checkInBasket(true);
                }
            }
          }
        );

       this.basketService.updateProducts.next(false);
       }
     }
   );
  }

}
