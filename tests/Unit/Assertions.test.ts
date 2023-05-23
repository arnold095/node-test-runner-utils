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
