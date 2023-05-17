import { FormControl } from '@angular/forms';

export interface SearchForm {
  title: FormControl<string>;
  year: FormControl<string>;
  type: FormControl<string>;
}

export interface SearchFormValues {
  title: string;
  year: string;
  type: string;
}

export interface SearchParams extends SearchFormValues {
  page: string;
}
