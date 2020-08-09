import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public countBuy: number;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCountBuy();
  }

  private getCountBuy(){
    this.orderService.getCountBuy().subscribe(
      res=>{
        if(res != null){
          this.countBuy = res;
        }
      }
    );
  }

}
