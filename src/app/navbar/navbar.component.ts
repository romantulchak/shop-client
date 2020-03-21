import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from '../service/basket.service';
import { ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public basketLength:number;


  constructor(private basketService: BasketService, private dialog: MatDialog) { }

  ngOnInit(): void {
/*
    if(localStorage.getItem('product') != null){
      let d = JSON.parse(localStorage.getItem('product'));
      this.basketLength = d.length;
      
    }
    */

    

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
