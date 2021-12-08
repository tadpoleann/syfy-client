// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
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
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favMovies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      //fetch all movies from api
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getGenreDetails(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '450px',
    });
  }

  getDirectorDetails(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth },
      width: '450px',
    });
  }

  getMovieSynopsis(
    Description: string,
    Title: string,
    TrailerUrl: string,
    ReleaseYear: number
  ): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Description, Title, TrailerUrl, ReleaseYear },
      width: '500px',
    });
  }

  getFavMovies(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      return this.favMovies;
    });
  }

  addFavMovie(id: string, Title: string): void {
    this.fetchApiData.addFavMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} is now added to your favorites`, 'OK', {
        duration: 3000,
      });
      console.log(resp);
      return this.getFavMovies();
    });
  }

  deleteFavMovie(id: string, Title: string): void {
    this.fetchApiData.deleteFavMovie(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${Title} has been removed from your favorites.`,
        'OK',
        {
          duration: 3000,
        }
      );
      console.log(resp);
      return this.getFavMovies();
    });
  }
}
