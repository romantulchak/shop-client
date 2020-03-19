import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
@Injectable()
export class ProductService{
    private GET_PRODUCTS = 'http://localhost:8080/api/products';
    private GET_PRODUCTS_BY_PRICE = 'http://localhost:8080/api/products/filterByPrice';
    private CREATE_PRODUCT = 'http://localhost:8080/api/products/createProduct';
    private DELETE_PRODUCT = 'http://localhost:8080/api/products/deleteProduct/';
    private PUSH_IMAGE = 'http://localhost:8080/api/products/pushImage';
    private DETAILS_PRODUCT = 'http://localhost:8080/api/products/details/';
    private GET_BY_ID = 'http://localhost:8080/api/products/getProductsById';
    private FILTER_BY_CATEGORY = 'http://localhost:8080/api/products/filterByCategory/';
    constructor(private http: HttpClient){}


    getProducts(): Observable<Product[]>{
       return this.http.get<Product[]>(this.GET_PRODUCTS);
    }
    getProductsByPrice(): Observable<Product[]>{
        return this.http.get<Product[]>(this.GET_PRODUCTS_BY_PRICE);
    }
    createProduct(product: Product){
        return this.http.post(this.CREATE_PRODUCT, product, {responseType:'text'});
    }
    deleteProduct(id: number){ 
        return this.http.delete(this.DELETE_PRODUCT + id, {responseType: 'text'});
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
        return this.http.post(this.PUSH_IMAGE, data);

    }

    detailsProduct(id: number): Observable<Product>{
        return this.http.get<Product>(this.DETAILS_PRODUCT + id);
    }

    filterByCategory(category: Category): Observable<Product[]>{
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('categoryName', category.categoryName);
        return this.http.get<Product[]>(this.FILTER_BY_CATEGORY, {params: paramsToSend})
    }
    getProductsById(ids: number[]){

        let paramsToSend = new HttpParams();
        for(let i = 0; i < ids.length; i++){
            paramsToSend = paramsToSend.append('id', ids[i].toString())
        }
        return this.http.get(this.GET_BY_ID, {params: paramsToSend});
    }
}