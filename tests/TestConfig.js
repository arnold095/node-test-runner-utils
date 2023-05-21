import { runTests } from "../src";

runTests({
    testPath: 'tests/**/*.test.ts',
    concurrency: true,
});