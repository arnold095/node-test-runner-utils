# node-test-utils

The `node-test-runner-utils` library has been developed with the purpose of facilitating the migration of projects based on Jest to the native test runner `node:test` of Node.js.

## Features

- Provides utilities that allow you to maintain the same testing syntax used with Jest.
- Facilitates the migration of projects to the native test runner of Node.js without the need to completely rewrite existing tests.

## Installation

To install `node-test-runner-utils`, make sure you have Node.js installed in your development environment. Then, run the following command:

```shell
npm install node-test-runner-utils --save-dev
```

## Usage

Once the library is installed, you can import the necessary utilities into your test files and use them in a similar way as you would with Jest. Here's an example:

First, create a configuration file for the native test runner of Node.js. For example, you can create a file named `node-test-runner.config.js` in the root directory of your project with the following content:

```javascript
import { runTests } from "../src";

runTests({ // Set the configuration options. Source: https://nodejs.org/api/test.html#runoptions
    testPath: 'tests/**/*.test.ts', // Path to the test files
    concurrency: true,
    reporter: 'spec', // Reporter to use (tap|spec|dot). Source: https://nodejs.org/api/test.html#test-reporters
});
```

This way, you can use the `node:test` module in the same way as you would with Jest. For example, you can add the following script to the `package.json` file:

```json
{
    "scripts": {
        "test:vanilla": "node node-test-runner.config.js", // Example to tun the tests if you project is based on vanilla JavaScript
        "test:ts": "node --require @swc/register node-test-runner.config.js" // example to run the tests if you project is based on TypeScript
    }
}
```

Then, you can create a test file named `basic-node-test-runner.test.ts` in the `tests` directory with the following content:

```javascript
import { describe, expect, it } from 'node-test-runner-utils';

describe('BasicNodeTestRunner', () => {
    it('should run a test', () => {
        expect(true).toBe(true);
    });

    it.each([
        { name: 'John', hasCar: true },
        { name: 'Mary', hasCar: true },
        { name: 'Bob', hasCar: true },
    ])('Should check if $name has a car', ({ hasCar }) => {
        expect(hasCar).toBeTruthy();
    });
});
```

This way, you can maintain the same syntax used with Jest and perform the migration more comfortably.

## Project Status
The node-test-runner-utils project is actively under development. The current version is 1.0.0.