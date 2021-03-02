export const isPositiveNumberEntered = (enteredStr: string): boolean => {
  return parseInt(enteredStr) >= 0 && enteredStr.length > 0;
};
