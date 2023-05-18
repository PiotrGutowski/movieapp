import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieData, MoviesData } from '../../../core/models/backend.models';
import { environment } from '../../../environments/environment';
import { SearchParams } from '../models/form.model';
import { createElementHttpParams } from '../utils/http-params';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _http: HttpClient) {}

  public getMovies(params: SearchParams): Observable<MoviesData> {
    return this._http.get<MoviesData>(`${environment.apiUrl}`, {
      params: createElementHttpParams(params),
    });
  }

  public getMovieById(id: string): Observable<MovieData> {
    return this._http.get<MovieData>(`${environment.apiUrl}i=${id}`);
  }
}
