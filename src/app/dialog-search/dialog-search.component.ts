import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../model/order.model';
import { Product } from '../model/product.model';
@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css']
})
export class DialogSearchComponent implements OnInit {

  public userDetails: any = {
    name: null,
    lastName: null,
    totalPrice: null,
    statuses: null,
    //isBeingProcessed: true,
    //isCompleted: false,
    //inTransit: false,
    //atTheDestination: false,
    //received: false
  }
  public items: Product[];
  public order: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    let userData = this.data.data[0];
    this.userDetails = {
      name: userData.costumerName,
      lastName: userData.costumerLastName,
      totalPrice: userData.totalPrice,
      statuses: userData.statuses
      //isBeingProcessed: userData.isBeingProcessed,
      //isCompleted: userData.isCompleted,
      //inTransit: userData.inTransit,
      //atTheDestination: userData.atTheDestination,
      //received: userData.received
    }
    console.log(userData);
    //TOOD: зробити через JsonView() на сервері і перебирати через цикл тут.

    this.order = this.data.data;
    console.log(this.data.data);
    for(let i = 0; i < this.order.length; i++){
      console.log(this.order[i]);
    }

    
  }

}
