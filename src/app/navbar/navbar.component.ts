import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BasketComponent } from '../basket/basket.component';
import { BasketService } from '../service/basket.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public basketLength:number;


  constructor(private basketService: BasketService) { }

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

  

}
