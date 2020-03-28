import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: TokenStorageService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        const user = this.authService.getUser();
        
        if(user != null && user.roles.includes(next.data.role)){
            return true;
        }
        this.router.navigate(['/404']);
        return false;
    }
}