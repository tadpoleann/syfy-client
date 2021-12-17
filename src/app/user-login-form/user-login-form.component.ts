import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  userLogin(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // close when user successfully logins
        this.dialogRef.close();
        // username and pw
        localStorage.setItem('username', this.userData.Username);
        localStorage.setItem('token', response.token);
        this.isLoading = false;
        // ..
        this.snackBar.open('Welcome back!', this.userData.Username, {
          duration: 3000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}