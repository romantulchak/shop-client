import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Subscription } from '../model/subscription.model';
import { HttpClient } from '@angular/common/http';


const API_URL = environment.apiUrl;
@Injectable({
    providedIn:'root'
})
export class SubscriptionService{


    constructor(private http: HttpClient){

    }

    follow(subscription: Subscription, userId: number){
        return this.http.post(API_URL + 'subscription/' + userId, subscription, {responseType:'text'});
    }


}