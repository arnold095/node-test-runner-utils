import { runTests } from "../src";
import {join} from "node:path";

runTests({
    testPath: 'tests/**/*.test.ts',
    concurrency: true,
    reporter: 'spec',
    teardownFile: join(__dirname, 'teardownFile.ts')
});