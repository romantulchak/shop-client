import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import { TokenStorageService } from '../service/token-storage.service';

import { SubscriptionService } from '../service/subscription.service';
import { Subscription } from '../model/subscription.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private notificationService: NotificationService, private toketnSerivce: TokenStorageService, private subscriptionService: SubscriptionService) { }
  public subscribtion: Subscription = new Subscription();


  ngOnInit(): void {
  }


  public subscribe(){
    console.log('CLOCK');

    let userId = null;
    if(this.toketnSerivce.currentUser != null){
     userId = this.toketnSerivce.currentUser.id;
    }
    this.subscriptionService.follow(this.subscribtion, userId).subscribe(
      res=>{
        this.notificationService.success(res);
      }

    );
  }
}
