import { Component, HostListener } from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import { WebSocketService } from '../../service/webSocket.service';
import { ProductService } from '../../service/product.service';
import { BasketService } from '../../service/basket.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  product:any[] = [];


  title = 'ShopFrontEnd';

  public notifications = 0;

  constructor(private webSocketService: WebSocketService, private productService: ProductService,private categoryService: CategoryService, private basketService: BasketService){

    let stompClient = this.webSocketService.connect();
    stompClient.connect({},frame=>{
      stompClient.subscribe('/topic/update', res => {
        console.log(res.body);
              if(res.body === 'updateProducts'){
               this.productService.updateProducts.next(true);        
              }else if(res.body === 'updateCategory'){
                this.categoryService.updateCategories.next(true);
              }
              
        })
    });

  }




  ngOnInit() {

    if(localStorage.getItem('product') === null){
      console.log('m,.m,.');
      localStorage.setItem('product',  JSON.stringify(this.product));
      this.basketService.updateBasket.next(true);
    }
  }


}
