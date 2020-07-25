import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subcategory } from '../model/subcategory.model';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;
@Injectable({
  providedIn:'root'
})
export class SubcategoryService{
  constructor(private http: HttpClient){

  }
  getSubcategories():Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(API_URL + 'subcategory/getSubcategories');
  }
  createSubcategory(subcategory:Subcategory, sections:any){
    subcategory.sections = sections;
    let paramsToSend = new HttpParams();
    return this.http.post(API_URL + 'subcategory/createSubcategory', subcategory,{responseType:'text', params: paramsToSend })
  }
  getSubactegoriesByCategoryName(categoryName:string):Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(API_URL + 'subcategory/getSubcategoriesByCategory/' + categoryName);
  }
}
