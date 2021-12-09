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
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getFavMovies();
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
      let cards = document.querySelectorAll('.card');
      let tempCards = Array.from(cards);

      // tempCards[i].classList.remove('active');
      // tempCards[i].classList.add('delete');

      this.checkNoFavorites();
    });
  }

  checkNoFavorites() {
    let container = document.querySelector('.container') as HTMLDivElement;
    let noFavorites = document.querySelector('.no-favorites') as HTMLDivElement;
    if (container.querySelectorAll('.active').length < 1)
      noFavorites.innerHTML = "You don't have any favorite movies!";
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
