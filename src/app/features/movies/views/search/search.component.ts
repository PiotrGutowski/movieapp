import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchForm, SearchFormValues } from '../../models/form.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public form!: FormGroup<SearchForm>;

  public types = ['movie', 'series', 'episode', 'game'];

  @Input() public searchData!: SearchFormValues | null;

  @Output() public search = new EventEmitter<Partial<SearchFormValues>>();

  public get yearControl(): FormControl<string> {
    return this.form.controls.year;
  }

  constructor(private _formBuilder: NonNullableFormBuilder) {}
  public ngOnInit(): void {
    this._createForm();

    this.form.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      if (data.title && this.yearControl.valid) {
        this.search.emit(data);
      }
    });
  }

  private _createForm(): void {
    this.form = this._formBuilder.group({
      title: '',
      year: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      type: '',
    });

    if (this.searchData) {
      this.form.patchValue(this.searchData);
    }
  }
}
