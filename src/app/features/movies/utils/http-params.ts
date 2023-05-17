import { HttpParams } from '@angular/common/http';
import { SearchParams } from '../models/form.model';

export const createElementHttpParams = (obj?: SearchParams): HttpParams => {
  let params = new HttpParams();
  if (!obj) {
    return params;
  }

  const { title, year, type, page } = obj;

  if (title) {
    params = params.append('s', title);
  }

  if (year) {
    params = params.append('y', year);
  }

  if (type) {
    params = params.append('type', type);
  }

  if (page) {
    params = params.append('page', page);
  }

  return params;
};
