import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  private roles: string[];
  public isLoggedIn = false;
  public showAdminBoard = false;
  public currentUserName: string;

  public currentUser: User;
  constructor() {
    this.logged();
   }


   logged(){
    this.isLoggedIn = !!this.getToken();
    
    if(this.isLoggedIn){
      this.currentUser = this.getUser();
      this.roles = this.currentUser.roles;
      
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.currentUserName = this.currentUser.username;
    }
  }
  signOut() {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    
    this.isLoggedIn = false;
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}