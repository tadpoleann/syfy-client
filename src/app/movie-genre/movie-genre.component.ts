import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss'],
})
export class MovieGenreComponent {
  /**
   * Injects genre Name and Description from movie-card component
   * Gets used in movie-genre component dialog
   * @param data object with strings Name, Description
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    }
  ) {}
  ngOnInit(): void {}
}
