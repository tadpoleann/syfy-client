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

  /**
   * calls function on page load to retrieve all movies in the database
   * and retrieves user's favorite movies
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Function that retrieves list of all moves from the database
   * @returns movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      //fetch all movies from api
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * function that opens dialog describing genre of the movie
   * @param  {string} Name - Name of the genre
   * @param  {string} Description - Description of the genre
   */
  getGenreDetails(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '450px',
    });
  }
  /**
   * Function to open dialog that shows director details
   * @param  {string} Name - Name of the director
   * @param  {string} Bio - Director's Biography
   * @param  {string} Birth - Director's birthday
   */
  getDirectorDetails(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { Name, Bio, Birth },
      width: '450px',
    });
  }
  /**
   * Function that opens dialog showing movie's details
   * @param  {string} Description - Movie description
   * @param  {string} Title - Movie title
   * @param  {string} TrailerUrl - Movie trailer url
   * @param  {number} ReleaseYear - Movie's release year
   */
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

  /**
   * Function to get user's favorite movies
   * @returns favMovies - the IDs of a user's favorite movies
   */
  getFavMovies(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      return this.favMovies;
    });
  }

  /**
   * Function that adds a movie to a user's list of favorites
   * @param  {string} id - Movie ID
   * @param  {string} Title - Movie title
   */
  addFavMovie(id: string, Title: string): void {
    this.fetchApiData.addFavMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`${Title} is now added to your favorites`, 'OK', {
        duration: 3000,
      });
      console.log(resp);
      return this.getFavMovies();
    });
  }
  /**
   * function that deletes a movie from a user's list of favorites
   * @param  {string} id - id of movie to be deleted from user's favorites
   * @param  {string} Title - title of movie to be deleted from user's favorites
   */
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
