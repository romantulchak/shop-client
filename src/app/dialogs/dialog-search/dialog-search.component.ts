import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../model/order.model';
import { Product } from '../../model/product.model';
import { OrderService } from 'src/app/service/order.service';
@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css']
})
export class DialogSearchComponent implements OnInit {


  public items: Product[];
  public order: Order;
  public isNotFound:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private orderService: OrderService) { }

  cancelOrder(identificationNumber: string){
    console.log(identificationNumber);
  }

  ngOnInit(): void {

    if(this.data != null){
      this.order = this.data.data;
    }

  }
  public search(identificationNumberForSeach:string){
    this.orderService.findByIdentificationNumber(identificationNumberForSeach.trim()).subscribe(
      res=>{
        if(res !=null){
          this.order = res;
          this.isNotFound = false;
        }
        else this.isNotFound = true;
      },
    );
  }
}
