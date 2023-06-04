import { describe, expect, it } from '../../../src';

describe('Should make the following toContainEqual assertions', () => {
  it('When is an array of numbers', () => {
    expect([1, 2, 3]).toContainEqual(2);
  });

  it('When is an array of numbers and the value is not in the array', () => {
    expect([1, 2, 3]).not.toContainEqual(4);
  });

  it('When is an array of strings', () => {
    expect(['a', 'b', 'c']).toContainEqual('b');
  });

  it('When is an array of strings and the value is not in the array', () => {
    expect(['a', 'b', 'c']).not.toContainEqual('d');
  });

  it('When is an array of booleans', () => {
    expect([true, false, true]).toContainEqual(false);
  });

  it('When object is an array of objects', () => {
    expect([{ a: 1 }, { b: 2 }, { c: 3 }]).toContainEqual({ b: 2 });
  });

  it('When object is not in the array', () => {
    expect([{ a: 1 }, { b: 2 }, { c: 3 }]).not.toContainEqual({ d: 4 });
  });

  it('When is an array of arrays', () => {
    expect([[1], [2], [3]]).toContainEqual([2]);
  });

  it('When is an array of arrays and the value is not in the array', () => {
    expect([[1], [2], [3]]).not.toContainEqual([4]);
  });
});
