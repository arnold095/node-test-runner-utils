import * as assert from 'assert';

const isEqualObjects = (
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>,
): boolean => {
  const keys1 = Object.keys(obj1);

  if (keys1.length !== Object.keys(obj2).length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key] || !(key in obj2)) {
      return false;
    }
  }

  return true;
};

const objectInArray = (
  array: Record<string, unknown>[],
  object: Record<string, unknown>,
): boolean => {
  return array.some(element => isEqualObjects(element, object));
};

const expectObjectInArray = (
  received: Record<string, unknown>[],
  expected: Record<string, unknown>,
  isNot = false,
): asserts received => {
  assert.ok(
    isNot ? !objectInArray(received, expected) : objectInArray(received, expected),
  );
};

export const toContainEqual = (
  received: unknown[],
  expected: unknown,
  isNot = false,
): void => {
  if (typeof expected === 'object') {
    return expectObjectInArray(
      received as Record<string, unknown>[],
      expected as Record<string, unknown>,
      isNot,
    );
  }

  return assert.ok(isNot ? !received.includes(expected) : received.includes(expected));
};
