import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserPersistanceService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginError = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userPersistanceService: UserPersistanceService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {
    if (this.userPersistanceService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  handleSubmit() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.loginUser({ email, password }).subscribe({
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.loginError = true;
        },
      });
    }
  }
}
