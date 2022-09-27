import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './guards/auth-guard/auth-guard.service';
import { UserService } from './services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ranpak';

  constructor(public authGuard: AuthGuard, private router: Router, private userService: UserService) {

  }

  get isLoginOrSignup() {
    return this.router.url === '/login' || this.router.url === '/signup'
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
