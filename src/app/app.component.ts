import { Component } from '@angular/core';
import { AuthGuard } from './guards/auth-guard/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ranpak';

  constructor(public authGuard: AuthGuard) {

  }
}
