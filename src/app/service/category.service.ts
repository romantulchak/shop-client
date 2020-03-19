import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private GET_CATEGORIES = 'http://localhost:8080/api/categories';
  private CREATE_CATEGORY = 'http://localhost:8080/api/categories/createCategory';
  private DELETE_CATEGORY = 'http://localhost:8080/api/categories/deleteCategory/';
  private EDIT_CATEGORY = 'http://localhost:8080/api/categories/editCategory';
  constructor(private http:HttpClient) { }


  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.GET_CATEGORIES);
  }
  createCategory(category: Category){
    return this.http.post(this.CREATE_CATEGORY, category, {responseType:'text'});
  }
  deleteCategory(id: number){
    return this.http.delete(this.DELETE_CATEGORY + id, {responseType:'text'});
  }
  editCategory(category: Category){
    return this.http.put(this.EDIT_CATEGORY, category);
  }

}
