import { run } from 'node:test';
import { dot as Dot, spec as Spec, tap as Tap } from 'node:test/reporters';

import { sync } from 'fast-glob';
import process from 'process';

type TestLoaderOptions = {
  testPath: string;
  concurrency?: boolean;
  timeout?: number;
  reporter?: 'dot' | 'spec' | 'tap';
};

const verifyTestPath = (testPath: string): void => {
  if (!testPath) throw new Error('testPath is required');
};

const defaultReporters = {
  dot: Dot,
  spec: new Spec(),
  tap: Tap,
};

const getReporter = (reporterName: TestLoaderOptions['reporter']): unknown => {
  const name = reporterName || 'spec';

  const reporter = defaultReporters[name];

  if (!reporter) throw new Error(`Reporter ${name} not found`);

  return reporter;
};

export const runTests = (options: TestLoaderOptions): void => {
  const { testPath, reporter, ...anotherOptions } = options;

  verifyTestPath(testPath);

  const files = sync([testPath]);

  run({
    ...anotherOptions,
    files,
  })
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    .compose(getReporter(reporter))
    .pipe(process.stdout);
};
