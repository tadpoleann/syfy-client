import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public snackbar: MatSnackBar) {}

  ngOnInit(): void {}

  /**
   * logOut function clears username and token from local storage to logout the user.
   */
  logOut(): void {
    this.snackbar.open('Successfully logged out', 'OK', {
      duration: 3000,
    });
    localStorage.clear();
  }
}
