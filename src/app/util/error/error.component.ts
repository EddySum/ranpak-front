import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnChanges {
  @Input() errors: ValidationErrors | null | undefined = null;

  errorMsgs: string[] = [];

  premadeErrList: { [key: string]: Function } = {
    /* Below types need to be any as abstract control.errors is typed as any */
    'required'  : (params: any)  => `This field is required`,
    'maxlength' : (params: any)  => `Maximum ${params.requiredLength} characters`,
    'minlength' : (params: any)  => `Minimum ${params.requiredLength} characters`,
    'password': (params: any)  => `Please ensure the password matches the following rules: \n \t * A special character must be included: (*@%$) \n\t * At least one capital letter \n\t * At least one number \n\t * Minimum 8 characters`
  }

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMsgs = this.generateMessages();
  }

  generateMessages(): string[] {
    if(this.errors == null || this.errors == undefined) return [];
    const messageList: string[] = [];

    

    if (this.errors) {
    return Object.entries(this.errors).map(([errorKey, errorVal]) => {
        return this.premadeErrList[errorKey](errorVal) 
      })
    }

    return messageList
  }

}
