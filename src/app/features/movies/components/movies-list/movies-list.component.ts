import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MoviesData } from '../../../../core/models/backend.models';
import { SpinnerService } from '../../../../core/services/spinner.service';
import { Movies } from '../../../../store/movies/movies.actions';
import { MovieState } from '../../../../store/movies/movies.state';
import { INIT_PAGE } from '../../consts/consts';
import { SearchFormValues, SearchParams } from '../../models/form.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy(this)
export class MoviesListComponent implements OnInit {
  @Select(MovieState.movies)
  public movies$!: Observable<MoviesData | null>;

  public searchParams!: SearchParams | null;

  public currentPage = INIT_PAGE;

  constructor(
    private _store: Store,
    private _router: Router,
    private _spinnerService: SpinnerService,
    private _actions$: Actions
  ) {}
  public ngOnInit(): void {
    this._registerStoreActions();
    this.searchParams = this._store.selectSnapshot(MovieState.searchParams);
    if (this.searchParams) {
      this.currentPage = this.searchParams.page ?? INIT_PAGE;
      this._store.dispatch(new Movies.FetchMovies(this.searchParams));
    }
  }

  public selectMovie(id: string): void {
    this._router.navigate(['/', id]);
  }

  public pageChanged(event: PageEvent): void {
    this._spinnerService.show();
    this.searchParams = this._store.selectSnapshot(MovieState.searchParams);
    if (this.searchParams) {
      this.searchParams.page = (event.pageIndex + 1).toString();
      this.currentPage = this.searchParams.page;
      this._triggerStoreActions(this.searchParams);
    }
  }

  public search(searchData: Partial<SearchFormValues>): void {
    this._spinnerService.show();
    this.currentPage = INIT_PAGE;
    const params = {
      title: searchData.title ?? '',
      year: searchData.year ?? '',
      type: searchData.type ?? '',
      page: INIT_PAGE,
    };
    this._triggerStoreActions(params);
  }

  private _registerStoreActions(): void {
    this._actions$
      .pipe(ofActionSuccessful(Movies.FetchMovies), untilDestroyed(this))
      .subscribe(() => {
        this._spinnerService.hide();
      });
  }

  private _triggerStoreActions(params: SearchParams): void {
    this._store.dispatch(new Movies.StoreSearchPrams(params));
    this._store.dispatch(new Movies.FetchMovies(params));
  }
}
