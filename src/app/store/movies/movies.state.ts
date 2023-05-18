import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { MovieData, MoviesData } from '../../core/models/backend.models';
import { SearchParams } from '../../features/movies/models/form.model';
import { MoviesService } from '../../features/movies/services/movies.service';
import { Movies } from './movies.actions';

export type MoviesStateModel = {
  moviesData: MoviesData | null;
  movieData: { [id: string]: MovieData };
  searchData: SearchParams | null;
};

@State<MoviesStateModel>({
  name: 'moviesInfo',
  defaults: {
    moviesData: null,
    movieData: {},
    searchData: null,
  },
})
@Injectable()
export class MovieState {
  constructor(private _moviesService: MoviesService) {}

  @Selector([MovieState])
  public static movies(state: MoviesStateModel): MoviesData | null {
    return state.moviesData;
  }

  @Selector([MovieState])
  public static selectedMovies(
    state: MoviesStateModel
  ): { [id: string]: MovieData } | null {
    return state.movieData;
  }

  @Selector([MovieState])
  public static movieById(state: MoviesStateModel): (id: string) => MovieData {
    return (id: string) => state.movieData[id];
  }

  @Selector([MovieState])
  public static searchParams(state: MoviesStateModel): SearchParams | null {
    return state.searchData;
  }

  @Action(Movies.FetchMovies)
  public fetchMovies(
    ctx: StateContext<MoviesStateModel>,
    { params }: Movies.FetchMovies
  ): Observable<MoviesData> {
    return this._moviesService.getMovies(params).pipe(
      tap((data) => {
        ctx.patchState({ moviesData: data });
      })
    );
  }

  @Action(Movies.FetchMovie)
  public fetchMovie(
    ctx: StateContext<MoviesStateModel>,
    { id }: Movies.FetchMovie
  ): Observable<MovieData> {
    return this._moviesService.getMovieById(id).pipe(
      tap((data) => {
        ctx.patchState({
          movieData: { ...ctx.getState()?.movieData, [data.imdbID]: data },
        });
      })
    );
  }

  @Action(Movies.StoreSearchPrams)
  public storeSearchParams(
    ctx: StateContext<MoviesStateModel>,
    { params }: Movies.StoreSearchPrams
  ): void {
    ctx.patchState({ searchData: params });
  }
}
