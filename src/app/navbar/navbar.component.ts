import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from '../service/basket.service';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { OrderService } from '../service/order.service';
import { DialogSearchComponent } from '../dialog-search/dialog-search.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('fade',[
      state('void', style({opacity:0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ])
  ],
   

})
export class NavbarComponent implements OnInit {

  public basketLength:number;
  public identificationNumberForSeach: string;


 


  constructor(private basketService: BasketService, private dialog: MatDialog, private orderService: OrderService) { }

  ngOnInit(): void {

    if(localStorage.getItem('product') != null){
      let d = JSON.parse(localStorage.getItem('product'));
      this.basketLength = d.length;
      
    }

  
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
}
