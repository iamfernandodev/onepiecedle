export function compareArrays(arr1: string[], arr2: string[], isHaki = false): number {
    if (arr1.length !== arr2.length && !isHaki)
        return 0;

    if (arr1.length === 0 && arr2.length === 0)
        return 1;

    if (arr1.length === 0 || arr2.length === 0)
        return 0;
  
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
  
    const areEqual = sortedArr1.every((value, index) => value === sortedArr2[index]);
  
    if (areEqual)
        return 1;
  
    if (isHaki) {
      const hasCommonItems = sortedArr1.some(value => arr2.includes(value));
      if (hasCommonItems) {
        return 2;
      }
    }
  
    return 0;
}