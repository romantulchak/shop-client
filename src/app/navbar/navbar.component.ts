import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from '../service/basket.service';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../dialogs/basket-dialog/basket-dialog.component';
import { OrderService } from '../service/order.service';
import { DialogSearchComponent } from '../dialogs/dialog-search/dialog-search.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { TokenStorageService } from '../service/token-storage.service';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  

})
export class NavbarComponent implements OnInit {

  public basketLength:number;
  public identificationNumberForSeach: string;

  public totalPrice: number;
 


  constructor(private dialogService: DialogService, public tokenStorageService: TokenStorageService ,private basketService: BasketService, private dialog: MatDialog, private orderService: OrderService) { }

  ngOnInit(): void {
    this.tokenStorageService.logged();

     this.basketService.updatePrice.subscribe(
       res=>{
         if(res === true){
          console.log('lox');
          this.getBasketCount();

          this.getTotalPrice();
         }
       }
     );

      




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
  }


  
     //TODO: дублювання в OrderComponent
  search(){
    this.orderService.findByIdentificationNumber(this.identificationNumberForSeach).subscribe(
      res=>{
       
          this.dialog.open(DialogSearchComponent,{
            data: {
              data: res
            }
          });
        
      },
      error=>{
        console.log(error);
      }
    );
      setTimeout(() => {
        this.basketService.count.subscribe(
          res=>{
              if(res != null){
                this.basketLength = res;
              }
          }
        );
      }, 500);
  }

  getTotalPrice(){
    this.basketService.totalPrice.subscribe(
      res=>{
        if(res != null)
          this.totalPrice = res;
      }
   );
  }
  getBasketCount(){
    this.basketService.count.subscribe(
      res=>{
        if(res !=null){
          this.basketLength = res;
        }
      }

  );
  }
  
  public openBasket(){
    
      this.dialog.open(BasketDialogComponent, {
        panelClass: 'dialog__basket'
      });
  }


  public loginDialog(){
    this.dialogService.loginDialog();
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
