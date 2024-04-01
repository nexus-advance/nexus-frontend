import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {  USER_KEY } from '../../core/const';
// Auth Services
import { AuthenticationService } from '../services/auth.service';  

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService, 
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {  
            this.authenticationService.veryfycarToken()
            .subscribe({
                next(data:any) {   
                    localStorage.setItem(USER_KEY, JSON.stringify(data.data));
                    localStorage.setItem("token", data.data.token); 
                },
                error(err:any) { 
                    localStorage.removeItem(USER_KEY);
                    localStorage.removeItem('token'); 
                },
            });

        }
        // check if user data is in storage is logged in via API.
        if(localStorage.getItem(USER_KEY)) { 
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
