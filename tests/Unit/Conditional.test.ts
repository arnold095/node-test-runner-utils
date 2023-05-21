import { beforeEach, describe, expect, it } from '../../src';

let isConditionMet = false;

beforeEach(() => {
  isConditionMet = true;
});

describe('Conditional test execution', () => {
  it('should run test only if condition is met', () => {
    if (isConditionMet) {
      expect(2 + 2).toBe(4);
    } else {
      expect(2 + 2).toBe(5);
    }
  });

  describe('When a test is skipped', () => {
    describe.skip('When the test is skipped', () => {
      it('should not run the test', () => {
        expect(true).toBe(false);
      });
    });

    describe('When the test is not skipped', () => {
      it('should run the test', () => {
        expect(true).toBe(true);
      });
    });
  });

  describe.skip('When the test is skipped', () => {
    it('should not run the test', () => {
      expect(true).toBe(false);
    });
  });

  describe('When the test is not skipped', () => {
    it('should run the test', () => {
      expect(true).toBe(true);
    });
  });
});
