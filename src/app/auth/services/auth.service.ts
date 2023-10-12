import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpUserInterface } from '../types/signup.interface';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private jwthelper: JwtHelperService,) {}

  signUpUser(user: SignUpUserInterface): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/register`,
      user
    );
  }

  loginUser(user: {
    email: string;
    password?: string;
  }): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/login`,
      user
    );
  }

  logOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUserData');
    sessionStorage.clear();
  }

  isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    if (!token || this.jwthelper.isTokenExpired(token)) return false;
    return true;
  }
}
