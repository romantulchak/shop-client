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


 


  constructor(private dialogService: DialogService, public tokenStorageService: TokenStorageService ,private basketService: BasketService, private dialog: MatDialog, private orderService: OrderService) { }

  ngOnInit(): void {
    this.tokenStorageService.logged();
  
    setTimeout(() => {
      if(this.basketService.count != null){
        this.basketService.count.subscribe(
          res=>{
            if(res !=null){
              console.log('RES NAV');
              console.log(res);
              this.basketLength = res;
            }
          }
  
      );
      } 
     
    
    }, 1000);

  
  }


  
     //TODO: дублювання в OrderComponent
  search(){
   
    this.orderService.findByIdentificationNumber(this.identificationNumberForSeach).subscribe(
      res=>{
        if(res != null){
          this.dialog.open(DialogSearchComponent,{
            data: {
              data: res
            }
          });
        }
        console.log('FROM MAIN');
        console.log(res);
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
         
            console.log('RES');
            console.log(res);
          
          }
        );
      }, 500);
      
    
        


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
