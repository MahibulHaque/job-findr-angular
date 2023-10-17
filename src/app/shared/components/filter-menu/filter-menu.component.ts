import { Component, OnInit } from '@angular/core';
import { UserPersistanceService } from '../../services/user-persistance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit {

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
