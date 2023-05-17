import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchFormValues } from '../../models/form.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeInstanceOf(FormGroup);
    expect(component.form.get('title')).toBeTruthy();
    expect(component.form.get('year')).toBeTruthy();
    expect(component.form.get('type')).toBeTruthy();
  });

  it('should patch the form values when searchData is provided', () => {
    const searchData: SearchFormValues = {
      title: 'Test Title',
      year: '2023',
      type: 'movie',
    };
    component.searchData = searchData;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.value).toEqual(searchData);
  });

  it('should emit search event on form value changes', fakeAsync(() => {
    const searchData: SearchFormValues = {
      title: 'Test Title',
      year: '2023',
      type: 'movie',
    };
    const emittedData: Partial<SearchFormValues> = {
      title: 'new Title',
      year: '',
      type: '',
    };
    component.searchData = searchData;
    fixture.detectChanges();

    spyOn(component.search, 'emit');

    component.form.get('title')?.patchValue('new Title');

    tick(501);
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith(emittedData);
  }));
});
