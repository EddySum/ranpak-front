import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, this.validatePassword]]
  })

  formSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  signUp() {
    this.formSubmitted = true;

    if(this.signupForm.invalid) { return };

    const {email, password} = this.signupForm.value
    this.userService.register(email as string, password as string).subscribe(); // Safe assertion as the fields are required in formgroup
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
