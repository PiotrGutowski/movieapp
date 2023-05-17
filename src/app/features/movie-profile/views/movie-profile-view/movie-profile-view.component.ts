import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieData } from '../../../../core/models/backend.models';
import { NOT_AVAILABLE } from '../../../movies/consts/consts';

@Component({
  selector: 'app-movie-profile-view',
  templateUrl: './movie-profile-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieProfileViewComponent {
  @Input() public movie!: MovieData | null;

  @Input() public lastDisplayedMovies!: { [id: string]: MovieData } | null;

  public notAvailable = NOT_AVAILABLE;
}
