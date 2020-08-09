import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../model/user.model';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { NotificationService } from '../service/notification.service';
import { ProfileService } from '../service/profile.service';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loading = true;
  public panelOpenState = false;
  public orders: any[];
  public currentOrder: any;
  public currentUser: User;

  public userFromStorage: any;

  constructor(private dialogService: DialogService, private token: TokenStorageService, private orderService: OrderService, private profileService: ProfileService,  private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userFromStorage = this.token.getUser();
    this.getUserDetails();
    
    this.getOrdersForUser();
  }

  getUserDetails(){
    this.profileService.userDetails(this.currentUser.id).subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
          

          setTimeout(() => {
            this.loading = false;
          }, 300);

          console.log(res);
        }
      }

    );
  }


  getOrdersForUser(){
    this.orderService.getAllOrdersForUser(this.currentUser).subscribe(


      res=>{
        this.orders = res;

      }

    );
  }

  openPanel(order: Order): boolean{

    this.currentOrder = order;
    if(this.currentOrder === order){
      this.panelOpenState = !this.panelOpenState;
      return true;
    }
    return false;
  }
  openEditDialog(user: User){
    this.dialogService.editUserDialog(user);
  } 
}
