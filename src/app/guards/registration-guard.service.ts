import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenStorageService} from '../service/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationGuard implements CanActivate{

    constructor(private authService: TokenStorageService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

        if(this.authService.isLoggedIn){
            
            this.router.navigate(['/']);
            return false;
        }else{
            return true;
        }

    }

}