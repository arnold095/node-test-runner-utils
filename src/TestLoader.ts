import { finished } from 'node:stream';
import { run } from 'node:test';
import { dot as Dot, spec as Spec, tap as Tap } from 'node:test/reporters';

import { sync } from 'fast-glob';
import process from 'process';

type TestLoaderOptions = {
  testPath: string;
  concurrency?: boolean;
  timeout?: number;
  reporter?: 'dot' | 'spec' | 'tap';
  teardownFile?: string;
  setup?: () => void | Promise<void>;
};

type TeardownFile = {
  teardown: () => Promise<void>;
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

const execTeardown = async (teardownFile: string): Promise<void> => {
  const { teardown } = (await import(teardownFile)) as TeardownFile;

  await teardown();
};

export const runTests = (options: TestLoaderOptions): void => {
  const { testPath, reporter, ...anotherOptions } = options;

  verifyTestPath(testPath);

  const files = sync([testPath]);
  const teardownFile = options.teardownFile ? sync(options.teardownFile)[0] : undefined;

  const composedReporter = getReporter(reporter) as NodeJS.ReadableStream;

  const runnerStream = run({
    ...anotherOptions,
    files,
  }).compose(composedReporter);

  finished(runnerStream, () => {
    if (teardownFile) {
      execTeardown(teardownFile)
        .then(() => {
          return Promise.resolve();
        })
        .catch(err => {
          console.error(
            `[TestLoader] An error has occurred in the teardown function ${
              (err as Error).message
            }`,
          );
          throw err;
        });
    }
  });

  runnerStream.pipe(process.stdout);
};
