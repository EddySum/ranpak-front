import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated = true;

  constructor(private router: Router) { }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return this.isAuthenticated;
}
}
