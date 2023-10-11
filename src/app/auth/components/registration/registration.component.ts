import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
  constructor(private formBuilder: FormBuilder) {}
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;
  dobValidator = (control: AbstractControl): ValidationErrors => {
    if (control.value) {
      const dob = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 16) {
        return { dobInvalid: true, message: 'Age should be greater than 16' };
      }
      if (age > 80) {
        return { dobInvalid: true, message: 'Age should be under 80' };
      }
    }
    return { dobInvalid: false, message: '' };
  };

  confirmPasswordValidator(control: AbstractControl): ValidationErrors {
    const password = control.get('password');
    const confirmPassword = control.get('repassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true, message: "Password doesn't match" };
    }

    return { passwordMismatch: false, message: '' };
  }
  signUpForm = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: [
        '',
        [
          Validators.required,
          this.confirmPasswordValidator
        ],
      ],
      // dob: ['', [Validators.required, this.dobValidator]],
      country:['Choose a country', Validators.required]
    },
  );

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if(this.signUpForm.valid){
      this.signUpForm.reset();
    }
    else{
      console.error('Form is not valid. Please fix the errors.');
    }
  }
}
