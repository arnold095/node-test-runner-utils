import * as assert from 'assert';

import { toContainEqual } from './Assert/ToContainEqual';
import { NewableClass } from './Utils/NewableClass';

export const expect = (value: any) => ({
  toBe: (expected: unknown) => {
    assert.strictEqual(value, expected);
  },
  toBeDefined: () => {
    assert.ok(value);
  },
  toBeUndefined: () => {
    assert.ok(!value);
  },
  toBeTruthy: () => {
    assert.strictEqual(true, value);
  },
  toBeFalsy: () => {
    assert.strictEqual(false, value);
  },
  toEqual: (expected: unknown) => {
    assert.deepStrictEqual(value, expected);
  },
  toHaveProperty: (property: string) => {
    assert.ok(value[property]);
  },
  toHaveLength: (length: number) => {
    assert.strictEqual(value.length, length);
  },
  toBeLessThan: (expected: number) => {
    assert.ok(value < expected);
  },
  toContain: (expected: unknown) => {
    assert.ok(value.includes(expected));
  },
  toContainEqual: (expected: unknown) => {
    toContainEqual(value as unknown[], expected);
  },
  toStrictEqual: (expected: unknown) => {
    assert.deepStrictEqual(value, expected);
  },
  not: {
    toBe: (expected: unknown) => {
      assert.notStrictEqual(value, expected);
    },
    toBeDefined: () => {
      assert.ok(!value);
    },
    toBeUndefined: () => {
      assert.ok(value);
    },
    toEqual: (expected: unknown) => {
      assert.notDeepStrictEqual(value, expected);
    },
    toHaveProperty: (property: string) => {
      assert.ok(!value[property]);
    },
    toHaveLength: (length: number) => {
      assert.notStrictEqual(value.length, length);
    },
    toBeLessThan: (expected: number) => {
      assert.ok(value >= expected);
    },
    toContain: (expected: unknown) => {
      assert.ok(!value.includes(expected));
    },
    toStrictEqual: (expected: unknown) => {
      assert.notDeepStrictEqual(value, expected);
    },
    toContainEqual: (expected: unknown) => {
      toContainEqual(value as unknown[], expected, true);
    },
  },
  rejects: {
    toThrow: async (expectedError?: string | Error | NewableClass<unknown>) => {
      try {
        await value;
        assert.fail('Expected to throw');
      } catch (err) {
        const error = err as Error;

        if (!expectedError) {
          assert.ok(error);
          return;
        }

        if (typeof expectedError === 'string') {
          assert.strictEqual(error, expectedError);
          return;
        }

        if (typeof expectedError === 'function') {
          assert.ok(error instanceof expectedError);
          return;
        }

        assert.fail(`Expected to throw ${expectedError} but received ${error.message}`);
      }
    },
  },
});
