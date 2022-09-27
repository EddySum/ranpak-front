import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { of, take } from 'rxjs';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.validatePassword]]
  })

  formSubmitted = false;

  accountCreated: boolean = false

  api422Msg: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.formSubmitted = true;

    if(this.signupForm.invalid) { return };

    const {email, password} = this.signupForm.value
    this.userService.register(email as string, password as string).pipe(take(1)).subscribe({
      next: (responseData) => {
        this.accountCreated = true;
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
    return this.signupForm.get('email');
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  validatePassword(control: AbstractControl) {
    const value = control.value;
    if (!(/^(?=.*[(*@%$)])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value))) {
      return { password: true };
    }
    return null;
  }

}
