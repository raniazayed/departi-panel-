import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate,CanActivateChild  {
 
  constructor( private authService:AuthService,private router : Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isAuthenticated()){
      console.log("auth")
      if (JSON.parse(localStorage.getItem('currentUser')).token != null)
      {
        let roles = next.data["roles"] as Array<string>;
        if (roles) {
          var match = this.authService.roleMatch(roles);
          if (match) return true;
          else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;
      }
    }
    this.router.navigate(['/signin']);
    return false;
}
    // return AuthService.isAuthenticated();
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.canActivate(childRoute,state);
    }
  }



