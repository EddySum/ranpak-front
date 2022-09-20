import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthGuard } from 'src/app/guards/auth-guard/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  formSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.formSubmitted = true;

    if(this.signInForm.invalid) { return };

    const {email, password} = this.signInForm.value
    this.userService.login(email as string, password as string).pipe(take(1)).subscribe(responseData => {
      this.router.navigate(['/home']);
    }); 
  }

  get emailControl() {
    return this.signInForm.get('email');
  }

  get passwordControl() {
    return this.signInForm.get('password');
  }

}
