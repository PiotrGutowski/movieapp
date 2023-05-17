import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieProfileRoutingModule } from './movie-profile-routing.module';
import { MovieProfileComponent } from './components/movie-profile/movie-profile.component';
import { MovieProfileViewComponent } from './views/movie-profile-view/movie-profile-view.component';

@NgModule({
  declarations: [MovieProfileComponent, MovieProfileViewComponent],
  imports: [CommonModule, MovieProfileRoutingModule],
})
export class MovieProfileModule {}
