import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor() {}
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  formSubmittingLoader: boolean = false;

  dobValidator = (control: AbstractControl): ValidationErrors => {
    if (control.value) {
      const dob = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 16) {
        return {
          dobInvalidAgeLow: true,
          message: 'Age should be greater than 16',
        };
      }
      if (age > 80) {
        return { dobInvalidAgeHigh: true, message: 'Age should be under 80' };
      }
    }
    return null;
  };

  confirmPasswordValidator = (control: AbstractControl): ValidationErrors => {
    if (control) {
      const password = this.signUpForm?.get('password')?.value;
      const repassword = control.value;
      if (!password || !repassword || password !== repassword) {
        return {
          passwordMismatch: true,
        };
      }
    }
    return null;
  };

  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    repassword: new FormControl('', [
      Validators.required,
      this.confirmPasswordValidator,
    ]),
    dob: new FormControl('', [Validators.required, this.dobValidator]),
    country: new FormControl('', Validators.required),
  });
  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.formSubmittingLoader = true;
      this.signUpForm.reset();
    } else {
      console.error('Form is not valid. Please fix the errors.');
    }
  }
}
