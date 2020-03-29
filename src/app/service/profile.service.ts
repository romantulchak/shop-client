import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';



const API_URL = 'http://localhost:8080/api/profile/';
@Injectable({
    providedIn: 'root'
})
export class ProfileService{

    constructor(private http: HttpClient){}


    userDetails(id: number): Observable<User>{
        return this.http.get<User>(API_URL + 'userDetails/' + id);
    }


}