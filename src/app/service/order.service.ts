import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../model/order.model';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
    providedIn:'root'
})
export class OrderService{
    private CREATE_ORDER = 'http://localhost:8080/api/order/createOrder';
    private SEARCH_BY_IDENTIFICATION_NUMBER = 'http://localhost:8080/api/order/findByIdentificationNumber/';
    constructor(private http: HttpClient){

    }


    createOrder(order: Order){
        return this.http.post(this.CREATE_ORDER, order, {responseType:'text'});
    }
    findByIdentificationNumber(identificationNumber: string): Observable<Order[]>{
        return this.http.get<Order[]>(this.SEARCH_BY_IDENTIFICATION_NUMBER + identificationNumber);
    }
    
}