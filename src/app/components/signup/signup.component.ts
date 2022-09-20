import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this.formSubmitted = true;

    if(this.signupForm.invalid) { return };

    const {email, password} = this.signupForm.value
    this.userService.register(email as string, password as string).pipe(take(1)).subscribe(responseData => {
      this.accountCreated = true;
      //this.router.navigate(['login']);
    }); 
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
