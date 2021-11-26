import { Inject, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

declare function Animate(): void; 

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {
    setInterval("Animate()", 400);
  }
  ngOnInit(){
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}