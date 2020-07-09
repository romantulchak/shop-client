import { Component, OnInit } from '@angular/core';
import { DialogService } from '../service/dialog.service';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../model/user.model';
import { BasketService } from '../service/basket.service';
import { BasketDialogComponent } from '../dialogs/basket-dialog/basket-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public currentUser:User;
  public totalPrice: number;
  public basketLength:number;
  constructor(private dialogService: DialogService,private dialog: MatDialog, private basketService: BasketService, private tokenStorageService: TokenStorageService) { }

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
         console.log('sss');
        }
      }
    );
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
  logout() {
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
}
