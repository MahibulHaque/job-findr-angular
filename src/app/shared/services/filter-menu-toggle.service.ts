import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class FilterMenuToggleService {
  private sidenav: MatSidenav;

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  toggle() {
    this.sidenav.toggle();
  }
}
