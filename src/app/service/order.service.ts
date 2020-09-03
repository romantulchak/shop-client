import { Injectable } from '@angular/core';
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
    constructor(private http: HttpClient){

    }


    createOrder(order: Order){
        return this.http.post(API_URL + 'order/createOrder', order, {responseType:'text'});
    }
    getAllOrders(): Observable<Order[]>{
        return this.http.get<Order[]>(API_URL + 'order/getAll/');
    }
    findByIdentificationNumber(identificationNumber: string): Observable<Order>{
        return this.http.get<Order>(API_URL + 'order/findByIdentificationNumber/' + identificationNumber);
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
    checkAmount(id: string, amount: string): Observable<number>{


        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('productId', id);
        paramsToSend = paramsToSend.append('productAmount', amount);
        return this.http.get<number>(API_URL + 'order/checkAmount', {params: paramsToSend});
    }

    getCountBuy():Observable<number>{
      return this.http.get<number>(API_URL + 'order/countBuy');
    }
    getTotalPriceByDay():Observable<number>{
      return this.http.get<number>(API_URL + 'order/totalMoneyByDay');
    }
    getOrderCounterByDay():Observable<number>{
      return this.http.get<number>(API_URL + 'order/getOrderCounterByDay');
    }
}
