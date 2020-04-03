import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import {environment} from '../../environments/environment';



const API_URL = environment.apiUrl; 


@Injectable()
export class ProductService{


    constructor(private http: HttpClient){}


    getProducts(): Observable<Product[]>{

       return this.http.get<Product[]>(API_URL + 'products');
    }
    getProductsByPrice(): Observable<Product[]>{
        return this.http.get<Product[]>(API_URL + 'products/filterByPrice');
    }
    createProduct(product: Product){
        return this.http.post(API_URL + 'products/createProduct', product, {responseType:'text'});
    }
    deleteProduct(id: number){ 
        return this.http.delete(API_URL + 'products/deleteProduct/' + id, {responseType: 'text'});
    }
    pushImage(files:File[]){
        const data: FormData = new FormData();
        
       /* files.forEach(el=>{
            console.log(el);
            data.append('file', el);
        });
        */  
       for(let i = 0; i < files.length; i++){
           data.append('file', files[i]);
       }
        return this.http.post(API_URL + 'products/pushImage', data);

    }

    detailsProduct(id: number): Observable<Product>{
        return this.http.get<Product>(API_URL + 'products/details/' + id);
    }

    filterByCategory(category: Category): Observable<Product[]>{
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('categoryName', category.categoryName);
        return this.http.get<Product[]>(API_URL + 'products/filterByCategory/', {params: paramsToSend})
    }

    filter(brands?:string[]): Observable<Product[]>{
        let paramsToSend = new HttpParams();
        if(brands != null){
            brands.forEach(brand=>{
                paramsToSend = paramsToSend.append('brands', brand);
            });
        }
        return this.http.get<Product[]>(API_URL + 'products/filter', {params: paramsToSend});


    }


}