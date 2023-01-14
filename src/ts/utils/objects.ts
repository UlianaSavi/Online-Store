export const isEqual = <T>(object1: T, object2: T): boolean => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};
