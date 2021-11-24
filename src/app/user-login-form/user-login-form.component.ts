import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''}

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // close when user successfully logins
      this.dialogRef.close();
      // username and pw
      localStorage.setItem('username', response.user.Username);
      localStorage.setItem('token', response.token);
      // Will most likely reditrect but for now can leave a note
      this.snackBar.open(response, 'Welcome back!', {
        duration: 3000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    })
  }
}