import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserPersistanceService {
  constructor(private jwthelper: JwtHelperService) {}
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
