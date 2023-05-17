import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesListViewComponent } from './views/movies-list-view/movies-list-view.component';
import { MaterialModule } from '../../modules/material/material.module';
import { SearchComponent } from './views/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WatchSizeDirective } from '../../directives/watch-size.directive';

@NgModule({
  declarations: [MoviesListComponent, MoviesListViewComponent, SearchComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    WatchSizeDirective,
  ],
})
export class MoviesModule {}
