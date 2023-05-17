import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { MovieData } from '../../../../core/models/backend.models';
import { Movies } from '../../../../store/movies/movies.actions';
import { MovieState } from '../../../../store/movies/movies.state';
import { Location } from '@angular/common';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-movie-profile',
  templateUrl: './movie-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class MovieProfileComponent implements OnInit {
  public id: string = '';

  public lastDisplayedMovies!: { [id: string]: MovieData } | null;

  public movie$: Observable<MovieData | null> = this._store
    .select(MovieState.movieById)
    .pipe(map((selectFn) => selectFn(this.id)));

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _location: Location,
    private _spinnerService: SpinnerService,
    private _actions$: Actions
  ) {}

  public ngOnInit(): void {
    this._route.paramMap.subscribe((param) => {
      this.id = param.get('id') ?? '';
      if (this.id) {
        this._spinnerService.show();
        this._store.dispatch(new Movies.FetchMovie(this.id));
      }
    });

    this._actions$
      .pipe(ofActionSuccessful(Movies.FetchMovie), untilDestroyed(this))
      .subscribe(() => {
        this._spinnerService.hide();
      });

    this.lastDisplayedMovies = this._store.selectSnapshot(
      MovieState.selectedMovies
    );
    if (this.lastDisplayedMovies) {
      delete this.lastDisplayedMovies[this.id];
    }
  }

  public back(): void {
    this._location.back();
  }
}
