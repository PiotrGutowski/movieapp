export class ArrayUtils {
  public static removeAt<T>(array: T[], index: number): T[] {
    if (index !== -1) {
      array.splice(index, 1);
    }

    return [...array];
  }

  public static removeSelectedElement<T>(array: T[], toRemove: T): T[] {
    const index = array.indexOf(toRemove);

    return ArrayUtils.removeAt(array, index);
  }
}
