import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from '../service/basket.service';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { OrderService } from '../service/order.service';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  

})
export class NavbarComponent implements OnInit {

  public basketLength:number;
  public identificationNumberForSeach: string;


 


  constructor(public tokenStorageService: TokenStorageService ,private basketService: BasketService, private dialog: MatDialog, private orderService: OrderService) { }

  ngOnInit(): void {
    this.tokenStorageService.logged();
  
    setTimeout(() => { 
      this.basketService.count.subscribe(

        res=>{
          if(res !=null){
            this.basketLength = res;
          }
        }

    );
    
    }, 500);

  
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
    this.dialog.open(LoginDialogComponent, {
        panelClass: 'dialog__login'
    })
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
