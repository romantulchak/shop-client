import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../model/brand.model';
import {environment} from '../../environments/environment';

const API_KEY = environment.apiUrl;

@Injectable({
        providedIn: 'root'
})
export class BrandService{

    constructor(private http: HttpClient){}

    getAllBrands(): Observable<Brand[]>{
        return this.http.get<Brand[]>(API_KEY + 'brands');
    }

    createBrand(brand: Brand){
        return this.http.post(API_KEY + 'brands/createBrand', brand, {responseType:'text'});
    }

}