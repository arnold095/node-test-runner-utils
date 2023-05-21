/* eslint-disable @typescript-eslint/ban-ts-comment */
import { run } from 'node:test';
// @ts-ignore
import { spec as Spec } from 'node:test/reporters';

import { sync } from 'fast-glob';
import process from 'process';

type TestLoaderOptions = {
  testPath: string;
  concurrency?: boolean;
  timeout?: number;
};

const verifyTestPath = (testPath: string): void => {
  if (!testPath) throw new Error('testPath is required');
};

export const runTests = (options: TestLoaderOptions): void => {
  const { testPath, ...anotherOptions } = options;

  verifyTestPath(testPath);

  const files = sync([testPath]);

  run({
    ...anotherOptions,
    files,
  })
    // @ts-ignore
    .compose(new Spec())
    .pipe(process.stdout);
};
