import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(private formBuilder: FormBuilder) {}

  dobValidator = (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const dob = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 16) {
        return {
          dobInvalidLow: true,
          message: 'Age should be greater than 16',
        };
      }
      if (age > 80) {
        return { dobInvalidHigh: true, message: 'Age should be under 80' };
      }
    }
    return null;
  };

  signUpForm = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    repassword: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required, this.dobValidator]),
    country: new FormControl('', [Validators.required]),
  });

  countryOptions: string[] = [
    'United States',
    'Bangladesh',
    'India',
    'United Kingdom',
  ];

  confirmPasswordValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    if (control) {
      const password = this.signUpForm.get('password')?.value;
      const repassword = control.value;
      if (!password || !repassword || password !== repassword) {
        return {
          passwordMismatch: true,
        };
      }
    }
    return null;
  };

  getFormControl(controlName: string): FormControl {
    return this.signUpForm.get(controlName) as FormControl;
  }

  handleSignupFormSubmit() {
    // Implement your form submission logic here
  }
}
