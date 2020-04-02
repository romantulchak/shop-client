import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../model/order.model';
import { identifierModuleUrl } from '@angular/compiler';
import { User } from '../model/user.model';
import {environment} from '../../environments/environment';


const API_URL = environment.apiUrl;

@Injectable({
    providedIn:'root'
})
export class OrderService{
    //private CREATE_ORDER = 'http://localhost:8080/api/order/createOrder';
    //private SEARCH_BY_IDENTIFICATION_NUMBER = 'http://localhost:8080/api/order/findByIdentificationNumber/';
    //private GET_ALL_ORDERS = 'http://localhost:8080/api/order/getAll/';

    //private SET_STATUS = 'http://localhost:8080/api/order/setStatus';
    //private SET_CANCEL = 'http://localhost:8080/api/order/cancel/';
    //private DELETE_CUSTOM = 'http://localhost:8080/api/order/deleteCustom/';
    
    //private GET_ALL_FOR_USER = 'http://localhost:8080/api/order/getAllForUser/';
    constructor(private http: HttpClient){
        
    }


    createOrder(order: Order){
        return this.http.post(API_URL + 'order/createOrder', order, {responseType:'text'});
    }
    getAllOrders(): Observable<Order[]>{
        return this.http.get<Order[]>(API_URL + 'order/getAll/');
    }
    findByIdentificationNumber(identificationNumber: string): Observable<Order[]>{
        return this.http.get<Order[]>(API_URL + 'order/findByIdentificationNumber/' + identificationNumber);
    }
    setStatus(order: Order, code: string){
        
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('statusCode', code);

        return this.http.put(API_URL + 'order/setStatus', order, {params: paramsToSend, responseType:'text'});
    }

    deleteCustom(id: number){
        return this.http.delete(API_URL + 'order/deleteCustom/' + id, {responseType:'text'});
    }
    orderCancel(order: Order){
        console.log(order.id);
        return this.http.put(API_URL + 'order/cancel/' + order.id, null, {responseType:'text'});
    }
    getAllOrdersForUser(user: User): Observable<Order[]>{
        return this.http.get<Order[]>(API_URL + 'order/getAllForUser/' + user.id);
    }
    checkAmount(id: string, amount: string){
      
        
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('productId', id);
        paramsToSend = paramsToSend.append('productAmount', amount);
        return this.http.get(API_URL + 'order/checkAmount', {params: paramsToSend});
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