import { HttpParams } from '@angular/common/http';
import { SearchParams } from '../models/form.model';
import { createElementHttpParams } from './http-params';

describe('createElementHttpParams', () => {
  it('should return empty HttpParams if object is not provided', () => {
    const result = createElementHttpParams();
    expect(result instanceof HttpParams).toBe(true);
    expect(result.toString()).toBe('');
  });

  it('should create HttpParams with correct query parameters', () => {
    const searchParams: SearchParams = {
      title: 'title',
      year: '2022',
      type: 'movie',
      page: '1',
    };

    const result = createElementHttpParams(searchParams);
    expect(result instanceof HttpParams).toBe(true);
    expect(result.toString()).toBe('s=title&y=2022&type=movie&page=1');
  });

  it('should create HttpParams without optional query parameters', () => {
    const searchParams: SearchParams = {
      title: 'title',
      year: '2034',
      type: '',
      page: '',
    };

    const result = createElementHttpParams(searchParams);
    expect(result instanceof HttpParams).toBe(true);
    expect(result.toString()).toBe('s=title&y=2034');
  });

  it('should return empty HttpParams if all properties in the object are falsy', () => {
    const searchParams: SearchParams = {
      title: '',
      year: '',
      type: '',
      page: '',
    };

    const result = createElementHttpParams(searchParams);
    expect(result instanceof HttpParams).toBe(true);
    expect(result.toString()).toBe('');
  });
});
