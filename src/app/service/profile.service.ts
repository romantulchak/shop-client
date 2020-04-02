import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


const API_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})
export class ProfileService{

    constructor(private http: HttpClient){}


    userDetails(id: number): Observable<User>{
        return this.http.get<User>(API_URL + 'profile/userDetails/' + id);
    }
    editUser(user: User){
        return this.http.put(API_URL + 'profile/editUser', user, {responseType:'text'});
    }

}