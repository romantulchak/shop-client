import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {DialogSearchComponent} from '../dialog-search/dialog-search.component';

import {NotificationService} from '../service/notification.service';
import {Status} from '../model/status.model';
import { from } from 'rxjs';
import { error } from 'protractor';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public isBeing;

  //public orders: Order[];

  public orders: MatTableDataSource<Order>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'customerName', 'customerLastName', 'identificationNumber', 'isBeingProcessed', 'isCompleted', 'inTransit', 'atTheDestination', 'received', 'delete', 'cancel'];
  constructor(private orderService: OrderService, private dialog: MatDialog, private notificationSerivce: NotificationService) { }

  ngOnInit(): void {
    this.getAllOrders();

  }
  getAllOrders(){
    this.orderService.getAllOrders().subscribe(

      res=>{
        if(res != null){
          this.orders = new MatTableDataSource(res);
          this.orders.paginator = this.paginator;
          console.log(res);


        }
      },
      error =>{
        console.log(error);
      }

    );
  }

  cancel(order: Order){
    order.cancel = !order.cancel;
      this.orderService.orderCancel(order).subscribe(

        res=>{
      
          this.notificationSerivce.openSnackBar(res);
          this.getAllOrders();
        },
        error=>{
          console.log(error)
        }


      );
  }

  deleteCustom(id: number){
    this.orderService.deleteCustom(id).subscribe(

      res=>{
        this.notificationSerivce.openSnackBar(res);
        this.getAllOrders(); 
      },
      error=>{
        console.log(error);
      }

    );
  }
  setStatus(order: Order, code: string){
    console.log(order);
    this.orderService.setStatus(order, code).subscribe(
      res=>{
        this.notificationSerivce.openSnackBar(res);
        this.getAllOrders();
      },
      error=>{
        console.log(error);
      }

    );
  }





  openDialog(identificationNumberForSeach: string){

    this.orderService.findByIdentificationNumber(identificationNumberForSeach).subscribe(
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
  }
  filter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.orders.filter = filterValue.trim().toLowerCase();
    if(this.orders.paginator){
      this.orders.paginator.firstPage();
    }

    if(this.orders.data.length === 0){
      console.log('lox');
    }
  }
}
