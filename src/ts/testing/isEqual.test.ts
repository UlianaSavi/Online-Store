import { isEqual } from '../utils/objects';

describe('IsEqual: ', () => {
  test('Should return true if two objects is equal', () => {
    const obj1 = {
      a: 'aaa',
      b: 'aaa'
    };
    const obj2 = {
      a: 'aaa',
      b: 'aaa'
    };
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  test('Should return false if two objects is not equal', () => {
    const obj1 = {
      a: 'aaa',
      b: 'aaa'
    };
    const obj2 = {
      a: 'bbb',
      b: 'bbb'
    };
    expect(isEqual(obj1, obj2)).toBe(false);
  });
});
