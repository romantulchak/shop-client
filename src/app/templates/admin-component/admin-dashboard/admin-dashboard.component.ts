import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public countBuy: number;
  public totalPriceByDay: number;
  public orderCounterByDay:number;
  public incomeByMonth: number;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCountBuy();
    this.getTotalMoneyByDay();
    this.getOrderCounterByDay();
    this.getIncomeByLastMonth();
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
  private getTotalMoneyByDay(){
    this.orderService.getTotalPriceByDay().subscribe(
      res=>{
        if(res != null){}
        this.totalPriceByDay = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  private getOrderCounterByDay(){
    this.orderService.getOrderCounterByDay().subscribe(
      res=>{
        if(res != null){
          this.orderCounterByDay = res;
        }
      },
      error => {
        console.log(error.getMessage());
      }
    );
  }
  private getIncomeByLastMonth(){
    this.orderService.getIncomeByLastMonth().subscribe(
      res=>{
        if(res != null){
          this.incomeByMonth = res;
        }
      },
      error => {
        console.log(error.getMessage());
      }
    );
  }
}
