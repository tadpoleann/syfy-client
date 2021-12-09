import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
//angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//components
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  movies: any[] = [];
  favMovies: any[] = [];
  favMovieIDs: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getFavMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie) => {
        if (this.favMovieIDs.includes(movie._id)) this.favMovies.push(movie);
      });
      return this.favMovies;
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
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.favMovieIDs = resp.FavoriteMovies;
        if (this.favMovieIDs.length === 0) {
          let noFavs = document.querySelector('.no-favs') as HTMLDivElement;
          noFavs.innerHTML = "You don't have any favorited movies";
        }
        console.log(resp.FavoriteMovies);
        return this.favMovieIDs;
      });
    }
    setTimeout(() => {
      this.getMovies();
    }, 100);
  }

  checkForFavs() {
    let container = document.querySelector('.container') as HTMLDivElement;
    let noFavs = document.querySelector('.no-favs') as HTMLDivElement;
    if (container.querySelectorAll('.faved').length < 1)
      noFavs.innerHTML = "You don't have any favorite movies!";
  }

  deleteFavMovie(id: string, Title: string, i: number): void {
    this.fetchApiData.deleteFavMovie(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${Title} has been removed from your favorites.`,
        'OK',
        {
          duration: 3000,
        }
      );
      console.log(resp);
      let favedMovieCards = document.querySelectorAll('.card');
      let favUnfavCards = Array.from(favedMovieCards);

      favUnfavCards[i].classList.remove('faved');
      favUnfavCards[i].classList.add('unfaved');

      this.checkForFavs();
    });
  }

  editProfile(): void {
    this.fetchApiData.editProfile(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open('Profile has been updated', 'OK', {
          duration: 3000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'ok', {
          duration: 3000,
        });
      }
    );
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  deleteProfile(): void {
    this.fetchApiData.deleteProfile().subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open('Your account has been deleted.', 'OK', {
          duration: 3000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 3000,
        });
      }
    );
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
