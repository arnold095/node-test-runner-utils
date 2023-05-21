import { describe, expect, it } from '../../src';

describe('Should iterate the scenarios', () => {
  describe('When iterating an array of objects', () => {
    it.each([
      { name: 'John', hasCar: true },
      { name: 'Mary', hasCar: true },
      { name: 'Bob', hasCar: true },
    ])('Should check if $name has a car', ({ hasCar }) => {
      expect(hasCar).toBeTruthy();
    });
  });
});
