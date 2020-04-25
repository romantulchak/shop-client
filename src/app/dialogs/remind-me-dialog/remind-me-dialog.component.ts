import { Component, OnInit, Inject } from '@angular/core';
import { RemindMe } from 'src/app/model/remindMe.model';
import { RemindMeSevice } from 'src/app/service/remindMe.service';
import { NotificationService } from 'src/app/service/notification.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.model';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-remind-me-dialog',
  templateUrl: './remind-me-dialog.component.html',
  styleUrls: ['./remind-me-dialog.component.css']
})
export class RemindMeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private product: Product ,private remindMeService: RemindMeSevice, private notificiationService: NotificationService, private userService: TokenStorageService) { }

  public remindMe: RemindMe = new RemindMe();

  public user: User;

  ngOnInit(): void {
    
    this.user = this.userService.getUser();
    if(this.user != null){
      this.remindMe.email = this.user.email;
    }
    this.remindMe.product = this.product;

  }


  createRemindMe(){
    this.remindMeService.createRemindMe(this.remindMe).subscribe(
      res=>{
        this.notificiationService.success(res);
      }

    );
  }

}
