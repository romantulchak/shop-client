import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../model/category.model';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  public updateCategories: BehaviorSubject<boolean>;
  constructor(private http:HttpClient) { 

    this.updateCategories = new BehaviorSubject<boolean>(false);

  }


  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(API_URL + 'categories');
  }
  createCategory(category: Category){

    //let paramsToSend = new HttpParams();
    //fields.forEach(el=>{
    //  paramsToSend = paramsToSend.append('field', el);
    //});
    return this.http.post(API_URL + 'categories/createCategory', category, {responseType:'text' });
  }
  pushCategoryImage(file: File){
    console.log(file);
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.post(API_URL + 'categories/pushCategoryImage', data); 
  }
  deleteCategory(id: number){
    return this.http.delete(API_URL + 'categories/deleteCategory/' + id, {responseType:'text'});
  }
  editCategory(category: Category){
    return this.http.put(API_URL + 'categories/editCategory', category, {responseType: 'text'});
  }

}
