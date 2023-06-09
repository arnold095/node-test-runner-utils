import { describe, expect, it } from '../../src';

describe('Should make the following assertions', () => {
  it('When the assertion is true', () => {
    expect(true).toBeTruthy();
  });

  it('When the assertion is false', () => {
    expect(false).toBeFalsy();
  });

  it('When the assertion is equal', () => {
    expect(1).toBe(1);
  });

  it('When the assertion is not equal', () => {
    expect(1).not.toBe(2);
  });

  it('When the object is equal', () => {
    expect({ a: 1 }).toEqual({ a: 1 });
  });

  it('When the object is not equal', () => {
    expect({ a: 1 }).not.toEqual({ a: 2 });
  });

  it('When exists a property', () => {
    expect({ a: 1 }).toHaveProperty('a');
  });

  it('When not exists a property', () => {
    expect({ a: 1 }).not.toHaveProperty('b');
  });

  it('When is defined', () => {
    expect(1).toBeDefined();
  });

  it('When is not defined', () => {
    expect(undefined).not.toBeDefined();
    expect(null).not.toBeDefined();
  });

  it('When is undefined', () => {
    expect(undefined).toBeUndefined();
  });

  it('When is not undefined', () => {
    expect(1).not.toBeUndefined();
  });

  it('When has a specific length', () => {
    expect([1, 2, 3]).toHaveLength(3);
  });

  it('When has not a specific length', () => {
    expect([1, 2, 3]).not.toHaveLength(2);
  });

  it('When is less than a specific value', () => {
    expect(1).toBeLessThan(2);
  });

  it('When is not less than a specific value', () => {
    expect(2).not.toBeLessThan(1);
  });

  it('When contains a specific value', () => {
    expect([1, 2, 3]).toContain(2);
  });

  it('When not contains a specific value', () => {
    expect([1, 2, 3]).not.toContain(4);
  });

  it('When is strictly equal', () => {
    const expectedDate = new Date();
    const actualDate = new Date(expectedDate.getTime());
    expect(expectedDate).toStrictEqual(actualDate);
  });

  it('When is not strictly equal', () => {
    const expectedDate = new Date();
    const actualDate = new Date(expectedDate.getTime() + 1);

    expect(expectedDate).not.toStrictEqual(actualDate);
  });

  describe('When the assertion is rejected', () => {
    it('Not expect a specific error', async () => {
      await expect(Promise.reject('Error')).rejects.toThrow();
    });

    it('Expect an error message', async () => {
      await expect(Promise.reject('Error')).rejects.toThrow('Error');
    });

    it('Expect a generic instance of error', async () => {
      await expect(Promise.reject(new Error('Error'))).rejects.toThrow(Error);
    });

    it('Expect a custom error', async () => {
      class CustomError extends Error {}
      await expect(Promise.reject(new CustomError('Error'))).rejects.toThrow(CustomError);
    });
  });
});
