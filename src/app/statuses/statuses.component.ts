import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../model/order.model';
@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.css']
})
export class StatusesComponent implements OnInit {

  constructor() { }

  //TODO: ВИВОДИТИ ЦІНУ ПО СКИДЦІ

  @Input() order: Order;

  @Input() products: any[];

  ngOnInit(): void {
    if(this.products === null){
      this.products = this.order.customProducts;
      console.log(this.products);
    }
  }

}
