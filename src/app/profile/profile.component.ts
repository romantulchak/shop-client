import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../model/user.model';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



  public orders: Order[];
  public userDetails = {
    name: null,
    lastName: null,
  }
  public currentUser: User;
  constructor(private token: TokenStorageService, private orderService: OrderService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getOrdersForUser();
  }

  getOrdersForUser(){
    if(this.currentUser != null){
      this.orderService.getAllOrdersForUser(this.currentUser).subscribe(
        res=>{
          if(res !=null){
            this.orders = res;
            console.log(res);
  

          }
        },
        error=>{
          console.log(error);
        }

      );
    }else{
      this.notificationService.openSnackBar("Error");
    }
  }

}
