import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../model/brand.models';


const API_KEY = 'http://localhost:8080/api/brands'

@Injectable({
        providedIn: 'root'
})
export class BrandService{

    constructor(private http: HttpClient){}

    getAllBrands(): Observable<Brand[]>{
        return this.http.get<Brand[]>(API_KEY);
    }

    createBrand(brand: Brand){
        return this.http.post(API_KEY + '/createBrand', brand, {responseType:'text'});
    }

}