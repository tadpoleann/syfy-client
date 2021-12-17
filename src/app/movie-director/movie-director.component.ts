import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss'],
})
export class MovieDirectorComponent {
  /**
   * Injects director Name, Bio, and Birthday from movie-card component
   * Gets used in movie-director component dialog
   * @param data object with strings Name, Bio, and Birth
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}
  ngOnInit(): void {}
}
