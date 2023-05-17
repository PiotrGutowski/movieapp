import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgxsModule } from '@ngxs/store';
import { MovieState } from './store/movies/movies.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    NgxsModule.forRoot([MovieState]),
    BrowserAnimationsModule,
    SpinnerComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
