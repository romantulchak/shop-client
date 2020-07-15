import { Component, OnInit } from '@angular/core';
import { DialogService } from '../service/dialog.service';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../model/user.model';
import { BasketService } from '../service/basket.service';
import { BasketDialogComponent } from '../dialogs/basket-dialog/basket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../service/order.service';
import { DialogSearchComponent } from '../dialogs/dialog-search/dialog-search.component';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('showBox', [
      state('in', style({
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform:'translateY(40px)',
          opacity: 0
        }),
        animate(600)
      ]),
      transition(':leave',
        animate(600, style({opacity: 0, transform:'translateY(0px)'})))
    ])
  ],
  host:{
    '(document:click)': 'closeSearch()',
  }
})
export class HeaderComponent implements OnInit {

  public currentUser:User;
  public totalPrice: number;
  public basketLength:number;
  public products: Product[];
  constructor(private dialogService: DialogService,private dialog: MatDialog, private basketService: BasketService, private tokenStorageService: TokenStorageService, private productService: ProductService) { }
  public closeSearchDialog:boolean = false;
  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.basketService.updateBasket.subscribe(
      res=>{
        if(res === true){
          this.basketService.getProductsFromDb();
          this.basketService.updatePrice.subscribe(
            res=>{
              if(res === true){
                this.getTotalPrice();
              }
            }
          );
        }
      }
    );

    this.basketService.updateOrder.subscribe(
      res=>{
         if(res === true){
          this.getTotalPrice();
          this.getBasketCount();
      }
    }
    );
    this.basketService.updatePrice.subscribe(
      res=>{
        if(res === true){
         this.getBasketCount();

         this.getTotalPrice();
        }
      }
    );
  }
  private closeSearch(event) {
    if(this.closeSearchDialog = true){
      this.closeSearchDialog = false;
    }
  }

  private getBasketCount(){
    this.basketService.count.subscribe(
      res=>{
        if(res !=null){
          this.basketLength = res;
        }
      }
  );
  }
  public loginDialog(){
    this.dialogService.loginDialog();
  }
  public logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  private getTotalPrice(){
    this.basketService.totalPrice.subscribe(
      res=>{
        if(res != null)
          this.totalPrice = res;
      }
   );
  }
  public openBasket(){

    this.dialog.open(BasketDialogComponent, {
      panelClass: 'dialog__basket'
    });
  }
  public search(){
      this.dialog.open(DialogSearchComponent);
  }
  public searchProduct(productName:string){
    this.closeSearchDialog = true;
    this.productService.searchProducts(productName).subscribe(
      res=>{
        console.log(res);
        if(res != null)
          this.products = res;
      }
    );
  }
}
