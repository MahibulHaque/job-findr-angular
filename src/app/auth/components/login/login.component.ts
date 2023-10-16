import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/shared/classes/unsubscribe.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Unsubscribe implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  showProgressSpinner = false;

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  getFormControl(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  handleLoginFormSubmit() {
    const { email, password } = this.loginForm.value as {
      email: string;
      password: string;
    };

    if (email && password) {
      this.authService
        .loginUser({ email, password })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (res) => {
            localStorage.setItem('accessToken', res.accessToken);
            this.showProgressSpinner = false;
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            if (err.error.message) {
              this.showSnackbarError(err.error.message);
            } else {
              this.showSnackbarError('An error occured during signin');
            }
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
