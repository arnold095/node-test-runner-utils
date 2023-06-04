// eslint-disable-next-line max-classes-per-file
import { describe, expect, it } from '../../../src';

describe('Should make the following toContainEqual assertions', () => {
  it.skip('When is an array of numbers', () => {
    expect([1, 2, 3]).toContainEqual(2);
  });

  it.skip('When is an array of numbers and the value is not in the array', () => {
    expect([1, 2, 3]).not.toContainEqual(4);
  });

  it.skip('When is an array of strings', () => {
    expect(['a', 'b', 'c']).toContainEqual('b');
  });

  it.skip('When is an array of strings and the value is not in the array', () => {
    expect(['a', 'b', 'c']).not.toContainEqual('d');
  });

  it.skip('When is an array of booleans', () => {
    expect([true, false, true]).toContainEqual(false);
  });

  it.skip('When object is an array of objects', () => {
    expect([{ a: 1 }, { b: 2 }, { c: 3 }]).toContainEqual({ b: 2 });
  });

  it.skip('When object is not in the array', () => {
    expect([{ a: 1 }, { b: 2 }, { c: 3 }]).not.toContainEqual({ d: 4 });
  });

  it.skip('When is an array of arrays', () => {
    expect([[1], [2], [3]]).toContainEqual([2]);
  });

  it.skip('When is an array of arrays and the value is not in the array', () => {
    expect([[1], [2], [3]]).not.toContainEqual([4]);
  });

  describe.skip('When is an array of instances', () => {
    class A {
      public constructor(public readonly id: number) {}
    }
    class B {
      public constructor(public readonly id: number) {}
    }

    it('When instance is in the array with same values', () => {
      expect([new A(1), new A(2), new A(3)]).toContainEqual(new A(2));
    });

    it('When instance is in the array with different values', () => {
      expect([new A(1), new A(2), new A(3)]).not.toContainEqual(new A(44));
    });

    it('When instance is in the array with different class', () => {
      expect([new A(1), new A(2), new A(3)]).not.toContainEqual(new B(2));
    });

    it('When instance is not in the array', () => {
      expect([new A(1), new A(2), new A(3)]).not.toContainEqual(new B(2));
    });
  });
});
