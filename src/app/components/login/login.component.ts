import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, take, throwError } from 'rxjs';
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

  api422Msg: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.formSubmitted = true;

    if(this.signInForm.invalid) { return };

    const {email, password} = this.signInForm.value
    this.userService.login(email as string, password as string).pipe(
      take(1),
    ).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        // TODO: Move logic to determine if non server or non 422 error to a global error handler
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          if(error.status === 422)  {
            this.api422Msg = error.error.errMsg
          }
        }

        return of(error.error);
      }
    })
  }

  get emailControl() {
    return this.signInForm.get('email');
  }

  get passwordControl() {
    return this.signInForm.get('password');
  }

}
