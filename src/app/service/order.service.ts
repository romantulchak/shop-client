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
    private GET_ALL_ORDERS = 'http://localhost:8080/api/order/getAll/';
    private SET_IS_BEING_PROCESSED = 'http://localhost:8080/api/order/setIsBeingProcessed/';
    private SET_COMPLETED = 'http://localhost:8080/api/order/setCompleted/';
    constructor(private http: HttpClient){

    }


    createOrder(order: Order){
        return this.http.post(this.CREATE_ORDER, order, {responseType:'text'});
    }
    getAllOrders(): Observable<Order[]>{
        return this.http.get<Order[]>(this.GET_ALL_ORDERS);
    }
    findByIdentificationNumber(identificationNumber: string): Observable<Order[]>{
        return this.http.get<Order[]>(this.SEARCH_BY_IDENTIFICATION_NUMBER + identificationNumber);
    }
    setIsBeingProcessed(order: Order){

        return this.http.put(this.SET_IS_BEING_PROCESSED, order, {responseType: 'text'});
    }
    setCompleted(order){
        return this.http.put(this.SET_COMPLETED, order, {responseType:'text'});
    }
    
}