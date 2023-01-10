// import { isEqual } from '../utils/objects';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const isEqual = require('../utils/objects');

test('Should return true if two objects is equal', () => {
  const obj1 = {
    a: 1,
    b: 2
  };
  const obj2 = {
    a: 1,
    b: 2
  };
  expect(isEqual(obj1, obj2)).toBe(true);
});
