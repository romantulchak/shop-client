import { Injectable } from '@angular/core';

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

  constructor() {

    this.logged();

   }
   logged(){
    this.isLoggedIn = !!this.getToken();
    
    if(this.isLoggedIn){
      const user = this.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.currentUserName = user.username;
    }
  }
  signOut() {
    window.sessionStorage.clear();
    this.isLoggedIn = false;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}