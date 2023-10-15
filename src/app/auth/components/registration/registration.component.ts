import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent extends Unsubscribe {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  showProgressSpinner = false;
  signUpError = false;

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

  countryOptions: string[] = ['us', 'bd', 'in', 'uk'];

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
    const { username, email, password, repassword, country, dob } = this
      .signUpForm.value as {
      username: string;
      email: string;
      password: string;
      repassword: string;
      country: string;
      dob: string;
    };

    if (username && password && email && repassword && dob && country) {
      this.showProgressSpinner = true;
      this.authService
        .signUpUser({ username, email, password, dob, country })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            localStorage.setItem('accessToken', res.accessToken);
            this.showProgressSpinner = false;
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            this.showSnackbarError(err.error.message);
            this.signUpError = true;
            this.showProgressSpinner = false;
          },
        });
    }
  }

  showSnackbarError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'end', // Position at the right
      verticalPosition: 'bottom', // Position at the bottom
    });
  }
}
