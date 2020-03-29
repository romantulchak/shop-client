import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { User } from '../model/user.model';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { NotificationService } from '../service/notification.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public loading = true;

  public orders: any[];

  public currentUser: User;
  constructor(private token: TokenStorageService, private orderService: OrderService, private profileService: ProfileService,  private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    
    this.getUserDetails();
    
    
  }

  getUserDetails(){
    this.profileService.userDetails(this.currentUser.id).subscribe(
      res=>{
        if(res != null){
          this.currentUser = res;
          this.orders = res.custom;

          setTimeout(() => {
            this.loading = false;
          }, 300);

          console.log(res);
        }
      }

    );
  }


  

}
