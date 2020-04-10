import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import {environment} from '../../environments/environment';
import { Cpu } from '../model/cpu.model';
import { Gpu } from '../model/gpu.model';



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

    getAllCpus(): Observable<Cpu[]>{
       
        return this.http.get<Cpu[]>(API_URL + 'products/cpus');
    }

    createCpu(cpu: Cpu){
        return this.http.post(API_URL + 'products/createCpu', cpu, {responseType: 'text'});
    }

    getAllGpus(): Observable<Gpu[]>{
        
        return this.http.get<Gpu[]>(API_URL + 'products/gpus');
    }

    createGpu(gpu: Gpu){
        return this.http.post(API_URL + 'products/createGpu', gpu, {responseType: 'text'});
    }


    detailsProduct(id: number): Observable<Product>{
        return this.http.get<Product>(API_URL + 'products/details/' + id);
    }

    filterByCategory(category: Category): Observable<Product[]>{
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('categoryName', category.categoryName);
        return this.http.get<Product[]>(API_URL + 'products/filterByCategory/', {params: paramsToSend})
    }

    filter(brands?:string[], cpus?: string[], gpus?: string[]): Observable<Product[]>{
        console.log(gpus);
        let paramsToSend = new HttpParams();
        if(brands != null){
            brands.forEach(brand=>{
                paramsToSend = paramsToSend.append('brands', brand);
            });
        }
        if(cpus != null){
          cpus.forEach(cpu=>{
            paramsToSend = paramsToSend.append('cpus', cpu);
          });
        }
        if(gpus != null){
            gpus.forEach(gpu=>{
                paramsToSend = paramsToSend.append('gpus', gpu);
            });
        }
        return this.http.get<Product[]>(API_URL + 'products/filter', {params: paramsToSend});
    }


    addPromo(product: Product, percent: number, numberOfDays: number, numberOfUses: number){
    
        return this.http.post(API_URL + 'products/createPromo/' + product.id + '/' + percent + '/' + numberOfDays + '/' + numberOfUses, null, {responseType: 'text'});
    }

    checkDiscount(code: string, productId: number){
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('code', code)
        return this.http.get(API_URL + 'products/checkDiscount/' + productId , {params: paramsToSend, responseType:'text'});
    }
}
