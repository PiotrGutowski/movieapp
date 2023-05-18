import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MoviesData, MoviesList } from '../../../../core/models/backend.models';
import { INIT_PAGE, NOT_AVAILABLE, SMALL_DEVICE } from '../../consts/consts';

@Component({
  selector: 'app-movies-list-view',
  templateUrl: './movies-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListViewComponent {
  public displayedColumns = ['poster', 'id', 'title', 'type', 'year'];

  @Input() public movies!: MoviesData | null;

  @Input() public currentPage = INIT_PAGE;

  @Output() public selectMovie = new EventEmitter<string>();

  @Output() public pageChanged = new EventEmitter<PageEvent>();

  public totalRows = 0;

  public notAvailable = NOT_AVAILABLE;

  constructor(private _changeDetector: ChangeDetectorRef) {}

  public set pageWidth(value: number) {
    if (value < SMALL_DEVICE) {
      this.displayedColumns = ['title'];
      this._changeDetector.detectChanges();
    } else if (this.displayedColumns.length === 1 && value > SMALL_DEVICE) {
      this.displayedColumns = ['poster', 'id', 'title', 'type', 'year'];
      this._changeDetector.detectChanges();
    }
  }

  public get dataSource(): MoviesList[] {
    if (this.movies) {
      this.totalRows = +this.movies.totalResults;
      return this.movies.Search;
    } else {
      return [];
    }
  }
}
