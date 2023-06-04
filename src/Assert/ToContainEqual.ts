import * as assert from 'assert';

import { Class } from '../Utils/Class';

const isPlainObject = (value: unknown): boolean => {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
};

const isClass = (value: unknown): boolean => {
  return (value as Class<unknown>).constructor.toString().startsWith('class');
};

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

const compareInstances = (
  instance1: Class<unknown>,
  instance2: Class<unknown>,
): boolean => {
  const isSameClass = instance1.constructor.name === instance2.constructor.name;

  if (!isSameClass) {
    return false;
  }

  const keys1 = Object.keys(instance1);
  const keys2 = Object.keys(instance2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (isClass(instance1[key]) && isClass(instance2[key])) {
      return compareInstances(
        instance1[key] as Class<unknown>,
        instance2[key] as Class<unknown>,
      );
    }

    if (instance1[key] !== instance2[key]) {
      return false;
    }
  }

  return true;
};

const expectInstanceInArray = (
  received: Class<unknown>[],
  expected: Class<unknown>,
  isNot = false,
): asserts received => {
  assert.ok(
    isNot
      ? !received.some(element => compareInstances(element, expected))
      : received.some(element => compareInstances(element, expected)),
  );
};

export const toContainEqual = (
  received: unknown[],
  expected: unknown,
  isNot = false,
): void => {
  if (isClass(expected)) {
    return expectInstanceInArray(
      received as Class<unknown>[],
      expected as Class<unknown>,
      isNot,
    );
  }

  if (isPlainObject(expected)) {
    return expectObjectInArray(
      received as Record<string, unknown>[],
      expected as Record<string, unknown>,
      isNot,
    );
  }

  return assert.ok(isNot ? !received.includes(expected) : received.includes(expected));
};
