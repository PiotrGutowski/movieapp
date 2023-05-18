import { ArrayUtils } from './array.utils';

describe('ArrayUtils', () => {
  it('should remove element by index', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const index = 2;
    const expectedArray = [1, 2, 4, 5, 6];

    const result = ArrayUtils.removeAt(array, index);

    expect(result).toEqual(expectedArray);
  });

  it('should return the same array if index is -1', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const index = -1;

    const result = ArrayUtils.removeAt(array, index);

    expect(result).toEqual(array);
  });

  it('should remove selected element from the array', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const elementToRemove = 3;
    const expectedArray = [1, 2, 4, 5, 6];

    const result = ArrayUtils.removeSelectedElement(array, elementToRemove);

    expect(result).toEqual(expectedArray);
  });

  it('should return the same array if the element is not found', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const elementToRemove = 10;

    const result = ArrayUtils.removeSelectedElement(array, elementToRemove);

    expect(result).toEqual(array);
  });
});
