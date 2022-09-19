import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  signUp() {
    const {email, password} = this.signupForm.value
    this.userService.register(email as string, password as string).subscribe(); // Safe assertion as the fields are required in formgroup
  }

}
