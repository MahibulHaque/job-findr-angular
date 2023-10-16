import { Component, OnInit } from '@angular/core';
import { UserPersistanceService } from '../../services/user-persistance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent implements OnInit {
  userAuthenticated: boolean = false;
  constructor(
    private userPersistanceService: UserPersistanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userAuthenticated = this.userPersistanceService.isLoggedIn();
  }

  logoutUser() {
    this.userPersistanceService.logOut();
    this.userAuthenticated = false;
    this.router.navigate(['home']);
  }
}
