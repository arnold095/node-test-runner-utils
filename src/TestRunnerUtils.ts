import {
  afterEach as afterEachNode,
  beforeEach as beforeEachNode,
  describe as describeNode,
  it as itNode,
} from 'node:test';

const replaceDynamicValues = (
  object: Record<string, unknown>,
  string: string,
): string => {
  const regex = /\$(\w+)/g;

  return string.replace(regex, (match: string, dynamicValue: string) => {
    return String(object[dynamicValue]) || match;
  });
};

export const describe = (description: string, tests: () => void): void => {
  return describeNode(description, tests);
};

describe.each =
  <T extends Record<string, unknown>>(scenarios: T[]) =>
  (description: string, test: (scenario: T) => void | Promise<void>): void => {
    for (const scenario of scenarios) {
      const scenarioDescription = replaceDynamicValues(scenario, description);
      describeNode(scenarioDescription, () => test(scenario));
    }
  };

describe.skip = describeNode.skip;

export const it = (
  description: string,
  test: (args?: any) => void | Promise<void>,
): void => {
  return itNode(description, test);
};

it.each =
  <T extends Record<string, unknown>>(scenarios: T[]) =>
  (description: string, test: (scenario: T) => void | Promise<void>): void => {
    for (const scenario of scenarios) {
      const scenarioDescription = replaceDynamicValues(scenario, description);
      itNode(scenarioDescription, () => test(scenario));
    }
  };

it.skip = itNode.skip;

export const beforeEach = beforeEachNode;
export const afterEach = afterEachNode;
