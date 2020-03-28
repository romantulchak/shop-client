import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../model/order.model';
import { identifierModuleUrl } from '@angular/compiler';
import { User } from '../model/user.model';

@Injectable({
    providedIn:'root'
})
export class OrderService{
    private CREATE_ORDER = 'http://localhost:8080/api/order/createOrder';
    private SEARCH_BY_IDENTIFICATION_NUMBER = 'http://localhost:8080/api/order/findByIdentificationNumber/';
    private GET_ALL_ORDERS = 'http://localhost:8080/api/order/getAll/';
    //private SET_IS_BEING_PROCESSED = 'http://localhost:8080/api/order/setIsBeingProcessed/';
    //private SET_COMPLETED = 'http://localhost:8080/api/order/setCompleted/';
    //private SET_TRANSIT = 'http://localhost:8080/api/order/setInTransit/';
    //private SET_DESTINATION = 'http://localhost:8080/api/order/setAtTheDestination/';
    private SET_STATUS = 'http://localhost:8080/api/order/setStatus';
    private SET_CANCEL = 'http://localhost:8080/api/order/cancel';
    private DELETE_CUSTOM = 'http://localhost:8080/api/order/deleteCustom/';
    
    private GET_ALL_FOR_USER = 'http://localhost:8080/api/order/getAllForUser/';
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
    setStatus(order: Order, code: string){
        
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('statusCode', code);

        return this.http.put(this.SET_STATUS, order, {params: paramsToSend, responseType:'text'});
    }

    deleteCustom(id: number){
        return this.http.delete(this.DELETE_CUSTOM + id, {responseType:'text'});
    }
    orderCancel(order: Order){
        return this.http.put(this.SET_CANCEL, order, {responseType: 'text'});
    }
    getAllOrdersForUser(user: User): Observable<Order[]>{
        return this.http.get<Order[]>(this.GET_ALL_FOR_USER + user.id);
    }
   /*
    setIsBeingProcessed(order: Order){

        return this.http.put(this.SET_IS_BEING_PROCESSED, order, {responseType: 'text'});
    }
    setCompleted(order: Order){
        return this.http.put(this.SET_COMPLETED, order, {responseType:'text'});
    }
    setInTransit(order: Order){
        return this.http.put(this.SET_TRANSIT, order, {responseType:'text'});
    }
    setAtTheDestination(order: Order){
        return this.http.put(this.SET_DESTINATION, order, {responseType:'text'});
    }
    setReceived(order: Order{
        
    }
    */
}