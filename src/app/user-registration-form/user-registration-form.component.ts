import { Component, OnInit, Input } from '@angular/core';
// this import is for closing the dialog on success
import { MatDialogRef } from '@angular/material/dialog'
//this import is bringing in the API calls created in fetch-api-data.service.ts
import { UserRegistrationService } from '../fetch-api-data.service';
//this import is used to display notifs back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// tell angular that class right below is a component
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  //define an input, or the user data
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  //called once the component has received all inputs
  ngOnInit(): void {
  }

  //function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
  // Logic for a successful user registration (To be implemented)
     this.dialogRef.close(); // This will close the modal on success
     console.log(response);
     this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
     });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}