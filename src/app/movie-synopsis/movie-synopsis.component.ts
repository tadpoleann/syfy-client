import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
})
export class MovieSynopsisComponent {
  /**
   * Injects movie details from movie-card component
   * Gets used in movie-synopsis component dialog
   * @param data object with strings Title, Description, TrailerUrl, ReleaseYear
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
      TrailerUrl: string;
      ReleaseYear: number;
    }
  ) {}

  ngOnInit(): void {}
}
