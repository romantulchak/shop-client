import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { RemindMe } from '../model/remindMe.model';


const API_KEY = environment.apiUrl;

@Injectable({
    providedIn:'root'
})
export class RemindMeSevice{
    constructor(private http: HttpClient){}


    createRemindMe(remindMe: RemindMe){
       return this.http.post(API_KEY + 'remindMe/create', remindMe, {responseType:'text'});
    }

}