/* eslint-disable @typescript-eslint/naming-convention */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MoviesListViewComponent } from './movies-list-view.component';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

describe('MoviesListViewComponent', () => {
  let component: MoviesListViewComponent;
  let fixture: ComponentFixture<MoviesListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatPaginatorModule, MatTableModule],
      declarations: [MoviesListViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update displayedColumns based on pageWidth', () => {
    component.pageWidth = 500;
    expect(component.displayedColumns).toEqual(['title']);

    component.pageWidth = 700;
    expect(component.displayedColumns).toEqual(['id', 'title', 'type', 'year']);
  });

  it('should emit selectMovie event with the movie id', () => {
    spyOn(component.selectMovie, 'emit');

    const movieId = '123';
    component.selectMovie.emit(movieId);

    expect(component.selectMovie.emit).toHaveBeenCalledWith(movieId);
  });

  it('should emit pageChanged event with the page event', () => {
    spyOn(component.pageChanged, 'emit');

    const pageEvent: PageEvent = {
      pageIndex: 0,
      pageSize: 10,
      length: 100,
    };
    component.pageChanged.emit(pageEvent);

    expect(component.pageChanged.emit).toHaveBeenCalledWith(pageEvent);
  });
});
