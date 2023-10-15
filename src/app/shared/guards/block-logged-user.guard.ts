import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserPersistanceService } from '../services/user-persistance.service';

@Injectable({
  providedIn: 'root',
})
export class BlockLoggedUserGuard implements CanActivate {
  constructor(
    private userPersistanceService: UserPersistanceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.userPersistanceService.isLoggedIn();
    if (isLoggedIn) {
      return this.router.parseUrl('/');
    }
    return true;
  }
}
