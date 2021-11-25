// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
//angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favMovies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => { //fetch all movies from api
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}