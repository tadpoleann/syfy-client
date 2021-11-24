import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { 
  HttpClient, 
  HttpHeaders, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://nameless-atoll-42754.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  constructor(private http: HttpClient) {
  }
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  //User login
  public userLogin(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
  }

  //delete user profile
  public deleteUser(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.delete(apiUrl + 'users/:Username', userDetails).pipe(catchError(this.handleError));
  }

  //get user profile
  getUser(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:Username', {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(catchError(this.handleError));
  }

  //edit user profile
  editProfile(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/:Username', {headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })}).pipe(catchError(this.handleError));
  }

  //gets all movies
  getAllMovies(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData), catchError(this.handleError));
  }

  //gets single movie
  getSingleMovie(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/:Title`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData), catchError(this.handleError));
  }

  //add fav movie
  addFavMovies(): Obervable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/:Username/Movies/:MovieID`,{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  //delete fav movie
  deleteFavMovie(): Obervable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/:Username/Movies/:MovieID`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get info about movie's genre
  getGenre(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/:Name`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  

  //get info about a movie's director
  getDirector(): Obervable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/:Name`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Non-typed response extraction
  */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}