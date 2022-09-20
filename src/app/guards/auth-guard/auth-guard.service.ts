import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuthenticated = false;

  constructor(private router: Router, private userService: UserService) { }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated$ = this.userService.getUser().pipe(switchMap(data => {
      return of(true)
    }),
    catchError((e) => {
      this.router.navigate(['/login']);
      return of(false);
    })); 
    


   return isAuthenticated$;
}
}
