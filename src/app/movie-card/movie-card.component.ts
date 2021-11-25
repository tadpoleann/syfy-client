// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
//angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//components
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

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

  getGenreDetails(Name: string, Description: string):void{
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '450px',
    });
  }

  getDirectorDetails(Name: string, Bio: string, Birth: string):void{
    this.dialog.open(MovieDirectorComponent, {
      data: {Name, Bio, Birth },
      width: '450px',
    });
  }
  
  getMovieSynopsis(Description: string, Title: string, TrailerUrl: string):void{
    this.dialog.open(MovieSynopsisComponent, {
      data: {Description, Title, TrailerUrl},
      width: '500px',
    });
  }

}