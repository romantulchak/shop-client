import { Component, HostListener } from '@angular/core';
import {TokenStorageService} from './service/token-storage.service';
import { WebSocketService } from './service/webSocket.service';
import { ProductService } from './service/product.service';
import { BasketService } from './service/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {





  title = 'ShopFrontEnd';

  public notifications = 0;

  constructor(private webSocketService: WebSocketService, private productService: ProductService, private basketService: BasketService){

    let stompClient = this.webSocketService.connect();
    stompClient.connect({},frame=>{
      stompClient.subscribe('/topic/update', res => {
      if(res.body === 'true'){
               this.productService.updateProducts.next(true);
               this.basketService.updateBasket.next(true);
              }
        })
    });

  }




  ngOnInit() {

  }


}
